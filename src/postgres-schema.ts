import { GeneratedAlways } from 'kysely';
import { Point } from 'geojson';

export interface RoadtripsTable {
  id: GeneratedAlways<number>;
  name: string;
  description: string;
}

export interface RoadtripPositionsTable {
  id: GeneratedAlways<number>;
  roadtrip_id: number;
  position: Point;
  elevation: number;
  timestamp: string; // date
}

export interface RoadtripMarkers {
  id: GeneratedAlways<number>;
  roadtrip_id: number;
  position: Point;
  description: string;
  icon_type: 'photo' | 'campsite';
  image_uuid: string | null;
  image_orientation: 'landscape' | 'portrait' | null;
}

export interface Database {
  'database.roadtrips': RoadtripsTable;
  'database.roadtrip_positions': RoadtripPositionsTable;
  'database.roadtrip_markers': RoadtripMarkers;
}
