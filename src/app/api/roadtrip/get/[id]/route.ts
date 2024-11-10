import { list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { Point } from 'geojson';
import { sql } from 'kysely';

import { db } from '@/app/api/kysely';
import { Marker, Locale } from '@/types';

export const fetchCache = 'force-no-store';

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = parseInt(params.id);

  const [locales, rawMarkers, { blobs }] = await Promise.all([
    db
      .selectFrom('database.roadtrip_positions')
      .select((eb) => [
        'elevation',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .orderBy('timestamp asc')
      .execute() as Promise<Locale[]>,
    db
      .selectFrom('database.roadtrip_markers')
      .select((eb) => [
        'id',
        'roadtrip_id',
        'image_uuid',
        'description',
        'image_orientation',
        'icon_type',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .execute(),
    list(),
  ]);

  const markers: Marker[] = rawMarkers.map((marker) => ({
    id: marker.id,
    roadtripId: marker.roadtrip_id,
    imageUrl: blobs.find((blob) => blob.pathname === marker.image_uuid)?.url || null,
    position: marker.position,
    description: marker.description,
    imageWidth: marker.image_orientation ? (marker.image_orientation === 'landscape' ? 300 : 200) : null,
    iconType: marker.icon_type,
  }));

  return NextResponse.json({ locales, markers });
}
