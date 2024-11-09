import { LngLat } from 'mapbox-gl';

export interface Roadtrip {
  id: number;
  name: string;
  description: string;
}

export interface Locale {
  position: LngLat;
  elevation: number;
}
