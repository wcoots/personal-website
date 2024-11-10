import { Point } from 'geojson';

export interface Roadtrip {
  id: number;
  name: string;
  description: string;
}

export interface Locale {
  position: Point;
  elevation: number;
}

export interface Marker {
  id: number;
  roadtripId: number;
  imageUrl: string | null;
  position: Point;
  description: string;
  imageWidth: number | null;
  iconType: 'photo' | 'campsite';
}
