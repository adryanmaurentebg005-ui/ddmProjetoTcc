import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { DenunciaLocalizacao, LocationState } from '../types/location';

interface UseUserLocationResult {
  state: LocationState;
  location: DenunciaLocalizacao | null;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<DenunciaLocalizacao | null>;
  resetToCurrent: () => Promise<void>;
}

const DEFAULT_LOCATION: DenunciaLocalizacao = {
  latitude: -23.5505,
  longitude: -46.6333,
  endereco: 'Rua principal, 100',
  numero: '100',
  bairro: 'Centro',
  cidade: 'São Paulo',
  estado: 'SP',
  cep: '01000-000',
  obtidaAutomaticamente: false,
};

export function useUserLocation(): UseUserLocationResult {
  const [state, setState] = useState<LocationState>('requesting-permission');
  const [location, setLocation] = useState<DenunciaLocalizacao | null>(DEFAULT_LOCATION);
  const [error, setError] = useState<string | null>(null);

  const buildLocationFromCoords = useCallback(async (lat: number, lon: number, automatic = true) => {
    setState('reverse-geocoding');
    try {
      const geo = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      const address = geo[0];

      const nextLocation: DenunciaLocalizacao = {
        latitude: lat,
        longitude: lon,
        endereco: address?.street ?? 'Endereço não identificado',
        numero: address?.name ?? address?.streetNumber ?? undefined,
        bairro: address?.subregion ?? address?.district ?? undefined,
        cidade: address?.city ?? 'Cidade não identificada',
        estado: address?.region ?? 'Estado não identificado',
        cep: address?.postalCode ?? undefined,
        obtidaAutomaticamente: automatic,
      };

      setLocation(nextLocation);
      setState('located');
      setError(null);
      return nextLocation;
    } catch (geoError) {
      console.error(geoError);
      const fallback: DenunciaLocalizacao = {
        latitude: lat,
        longitude: lon,
        endereco: 'Localização obtida, endereço não identificado',
        cidade: 'Cidade não identificada',
        estado: 'Estado não identificado',
        obtidaAutomaticamente: automatic,
      };
      setLocation(fallback);
      setError('Não foi possível identificar o endereço da localização.');
      setState('error');
      return fallback;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    setState('requesting-permission');
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setState('permission-denied');
        setError('Permissão de localização negada. Você pode pesquisar ou selecionar manualmente no mapa.');
        return false;
      }

      return true;
    } catch (permissionError) {
      console.error(permissionError);
      setState('error');
      setError('Não foi possível acessar a permissão de localização.');
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setState('locating');
    setError(null);

    try {
      const permission = await Location.getForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        const allowed = await requestPermission();
        if (!allowed) {
          return null;
        }
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return buildLocationFromCoords(current.coords.latitude, current.coords.longitude, true);
    } catch (locationError) {
      console.error(locationError);
      setState('error');
      setError('Não foi possível obter a localização atual do dispositivo.');
      return null;
    }
  }, [buildLocationFromCoords, requestPermission]);

  const resetToCurrent = useCallback(async () => {
    await getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    void (async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === 'granted') {
          await getCurrentLocation();
        } else {
          setState('permission-denied');
          setLocation(DEFAULT_LOCATION);
        }
      } catch (error) {
        console.error(error);
        setState('error');
        setError('Não foi possível carregar a localização.');
      }
    })();
  }, [getCurrentLocation]);

  return { state, location, error, requestPermission, getCurrentLocation, resetToCurrent };
}
