import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Camera,
  Map,
  Marker,
  UserLocation,
  type CameraRef,
  type PressEvent,
  type ViewStateChangeEvent,
} from '@maplibre/maplibre-react-native';

export interface SelectedLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationMapProps {
  initialLocation?: SelectedLocation;
  onLocationChange?: (location: SelectedLocation) => void;
  onConfirmLocation?: (location: SelectedLocation) => void;
  onBack?: () => void;
}

const MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';
const INITIAL_ZOOM = 16;
type ScreenState = 'requesting-permission' | 'loading-location' | 'loading-address' | 'ready' | 'error';

function formatAddress(place: Location.LocationGeocodedAddress | undefined, latitude: number, longitude: number) {
  if (!place) return 'Endereço não identificado';
  const street = [place.street, place.streetNumber].filter(Boolean).join(', ');
  const locality = [place.district, place.city && place.region ? `${place.city}/${place.region}` : place.city ?? place.region]
    .filter(Boolean)
    .join(' - ');
  return [street, locality].filter(Boolean).join('\n') || `Localização selecionada (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
}

export default function LocationMap({ initialLocation, onLocationChange, onConfirmLocation, onBack }: LocationMapProps) {
  const cameraRef = useRef<CameraRef>(null);
  const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocodeRequest = useRef(0);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(initialLocation ?? null);
  const [state, setState] = useState<ScreenState>('requesting-permission');
  const [error, setError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    void locateUser();
    return () => {
      if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
    };
  }, []);

  function publishLocation(location: SelectedLocation) {
    setSelectedLocation(location);
    onLocationChange?.(location);
  }

  async function reverseGeocode(latitude: number, longitude: number) {
    const requestId = ++geocodeRequest.current;
    setState('loading-address');
    try {
      const results = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (requestId !== geocodeRequest.current) return;
      publishLocation({ latitude, longitude, address: formatAddress(results[0], latitude, longitude) });
      setState('ready');
      setError(null);
    } catch (caughtError) {
      if (requestId !== geocodeRequest.current) return;
      console.error('Erro no reverse geocoding:', caughtError);
      publishLocation({ latitude, longitude, address: 'Endereço não identificado' });
      setState('error');
      setError('Não foi possível obter o endereço. Você ainda pode confirmar a coordenada selecionada.');
    }
  }

  function scheduleReverseGeocode(latitude: number, longitude: number) {
    if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
    geocodeTimer.current = setTimeout(() => void reverseGeocode(latitude, longitude), 450);
  }

  function moveCamera(latitude: number, longitude: number) {
    cameraRef.current?.flyTo({ center: [longitude, latitude], zoom: INITIAL_ZOOM, duration: 650 });
  }

  async function locateUser() {
    setState('requesting-permission');
    setError(null);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setState('error');
        setError('Precisamos da sua localização para centralizar o mapa. Tente novamente ou ative a permissão nas configurações.');
        return;
      }
      setState('loading-location');
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = current.coords;
      moveCamera(latitude, longitude);
      await reverseGeocode(latitude, longitude);
    } catch (caughtError) {
      console.error('Erro ao obter localização:', caughtError);
      setState('error');
      setError('Não foi possível obter o GPS. Verifique se a localização está ligada e tente novamente.');
    }
  }

  function handleMapPress(event: PressEvent) {
    const [longitude, latitude] = event.lngLat;
    moveCamera(latitude, longitude);
    publishLocation({ latitude, longitude, address: 'Obtendo endereço...' });
    scheduleReverseGeocode(latitude, longitude);
  }

  function handleRegionDidChange(event: ViewStateChangeEvent) {
    if (!event.userInteraction) return;
    const [longitude, latitude] = event.center;
    publishLocation({ latitude, longitude, address: 'Obtendo endereço...' });
    scheduleReverseGeocode(latitude, longitude);
  }

  return (
    <View style={styles.screen}>
      <Map
        style={StyleSheet.absoluteFill}
        mapStyle={MAP_STYLE_URL}
        onPress={(event) => handleMapPress(event.nativeEvent)}
        onRegionDidChange={(event) => handleRegionDidChange(event.nativeEvent)}
        onDidFinishLoadingMap={() => setMapReady(true)}
        onDidFailLoadingMap={() => {
          setMapReady(false);
          setState('error');
          setError('O mapa não conseguiu carregar os tiles. Verifique a conexão no Development Build.');
        }}
        attribution
        compass
        logo
      >
        <Camera ref={cameraRef} initialViewState={selectedLocation ? { center: [selectedLocation.longitude, selectedLocation.latitude], zoom: INITIAL_ZOOM } : undefined} />
        <UserLocation animated accuracy />
        {selectedLocation && (
          <Marker id="selected-location" lngLat={[selectedLocation.longitude, selectedLocation.latitude]}>
            <View style={styles.marker}>
              <MaterialCommunityIcons name="map-marker" size={42} color="#1976D2" />
            </View>
          </Marker>
        )}
      </Map>

      {!mapReady && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator color="#1976D2" />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}
      <View style={styles.topControls}>
        <Pressable style={styles.floatingButton} onPress={onBack} accessibilityLabel="Voltar">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#123B65" />
        </Pressable>
      </View>
      <View style={styles.addressCard}>
        <View style={styles.addressIcon}><MaterialCommunityIcons name="map-marker-radius" size={22} color="#1976D2" /></View>
        <View style={styles.addressContent}>
          <Text style={styles.cardLabel}>{state === 'loading-address' ? 'IDENTIFICANDO LOCAL' : 'LOCAL DA OCORRÊNCIA'}</Text>
          <Text style={styles.cardAddress}>{selectedLocation?.address ?? 'Precisamos da sua localização'}</Text>
        </View>
        {state === 'loading-address' && <ActivityIndicator size="small" color="#1976D2" />}
      </View>
      <View style={styles.mapControls}>
        <Pressable style={styles.floatingButton} onPress={() => void locateUser()} accessibilityLabel="Minha localização">
          <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#123B65" />
        </Pressable>
      </View>
      {error && (
        <View style={styles.errorCard}>
          <MaterialCommunityIcons name="alert-circle-outline" size={22} color="#B42318" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <View style={styles.sheetHeader}>
          <MaterialCommunityIcons name="map-marker-check" size={24} color="#1976D2" />
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Local selecionado</Text>
            <Text style={styles.sheetAddress}>{selectedLocation?.address ?? 'Selecione um ponto no mapa'}</Text>
          </View>
        </View>
        <Text style={styles.instruction}>Arraste o mapa ou toque em outro ponto para ajustar a localização.</Text>
        <Pressable
          style={[styles.confirmButton, (!selectedLocation || state === 'loading-address') && styles.disabledButton]}
          disabled={!selectedLocation || state === 'loading-address'}
          onPress={() => selectedLocation && onConfirmLocation?.(selectedLocation)}
        >
          <MaterialCommunityIcons name="map-marker-check" size={20} color="#FFFFFF" />
          <Text style={styles.confirmButtonText}>Confirmar localização</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E5E7EB' },
  marker: { alignItems: 'center', justifyContent: 'center' },
  loadingOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 10, color: '#123B65', fontWeight: '700' },
  topControls: { position: 'absolute', top: 18, left: 16 },
  floatingButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 5 },
  addressCard: { position: 'absolute', top: 18, left: 76, right: 16, minHeight: 66, borderRadius: 16, padding: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  addressIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E8F1FB', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  addressContent: { flex: 1 },
  cardLabel: { fontSize: 11, fontWeight: '800', color: '#667085', marginBottom: 3 },
  cardAddress: { fontSize: 14, lineHeight: 19, fontWeight: '700', color: '#123B65' },
  mapControls: { position: 'absolute', right: 16, bottom: 230 },
  errorCard: { position: 'absolute', top: 96, left: 16, right: 16, borderRadius: 14, padding: 12, backgroundColor: '#FFF4F2', flexDirection: 'row', alignItems: 'center', gap: 8 },
  errorText: { flex: 1, color: '#B42318', fontSize: 12, lineHeight: 17 },
  bottomSheet: { position: 'absolute', left: 0, right: 0, bottom: 0, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 22, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: -3 }, elevation: 10 },
  dragHandle: { width: 44, height: 4, borderRadius: 2, alignSelf: 'center', backgroundColor: '#D0D5DD', marginBottom: 16 },
  sheetHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  sheetContent: { flex: 1, marginLeft: 10 },
  sheetTitle: { fontSize: 13, fontWeight: '800', color: '#667085', marginBottom: 4 },
  sheetAddress: { fontSize: 16, lineHeight: 22, fontWeight: '800', color: '#123B65' },
  instruction: { marginTop: 10, color: '#667085', fontSize: 12, lineHeight: 17 },
  confirmButton: { minHeight: 48, marginTop: 16, borderRadius: 12, backgroundColor: '#1976D2', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  disabledButton: { opacity: 0.5 },
  confirmButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
