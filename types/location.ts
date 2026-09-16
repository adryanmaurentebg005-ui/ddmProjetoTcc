export type LocationState =
  | 'requesting-permission'
  | 'locating'
  | 'located'
  | 'reverse-geocoding'
  | 'confirmed'
  | 'manual-selection'
  | 'permission-denied'
  | 'error';

export interface DenunciaLocalizacao {
  latitude: number;
  longitude: number;
  endereco: string;
  numero?: string;
  bairro?: string;
  cidade: string;
  estado: string;
  cep?: string;
  obtidaAutomaticamente: boolean;
}

export interface ReverseGeocodeResult {
  endereco: string;
  numero?: string;
  bairro?: string;
  cidade: string;
  estado: string;
  cep?: string;
}
