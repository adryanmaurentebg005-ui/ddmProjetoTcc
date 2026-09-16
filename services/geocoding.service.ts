import * as Location from 'expo-location';
import { ReverseGeocodeResult } from '../types/location';

export async function reverseGeocodeLocation(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> {
  try {
    const result = await Location.reverseGeocodeAsync({ latitude, longitude });
    const place = result[0];

    if (!place) {
      return {
        endereco: 'Endereço não identificado',
        cidade: 'Cidade não identificada',
        estado: 'Estado não identificado',
      };
    }

    return {
      endereco: place.street ?? 'Rua não informada',
      numero: place.name ?? place.streetNumber ?? undefined,
      bairro: place.subregion ?? place.district ?? undefined,
      cidade: place.city ?? 'Cidade não identificada',
      estado: place.region ?? 'Estado não identificado',
      cep: place.postalCode ?? undefined,
    };
  } catch (error) {
    console.error('reverseGeocodeLocation error', error);
    throw new Error('Não foi possível identificar o endereço da localização.');
  }
}
