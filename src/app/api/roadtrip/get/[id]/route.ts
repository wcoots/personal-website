import { list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { LngLat } from 'mapbox-gl';
import { Point } from 'geojson';
import { sql } from 'kysely';

import { db } from '@/app/api/kysely';
import { Image, Locale } from '@/types';

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = parseInt(params.id);

  const [roadtripData, roadtripImages, { blobs }] = await Promise.all([
    db
      .selectFrom('database.roadtrip_positions')
      .select((eb) => [
        'roadtrip_id',
        'elevation',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .orderBy('timestamp asc')
      .execute(),
    db
      .selectFrom('database.roadtrip_images')
      .select((eb) => [
        'id',
        'roadtrip_id',
        'uuid',
        'description',
        'orientation',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .execute(),
    list(),
  ]);

  const locales: Locale[] = roadtripData.map((position) => ({
    position: new LngLat(position.position.coordinates[0], position.position.coordinates[1]),
    elevation: position.elevation,
  }));

  const images: Image[] = roadtripImages
    .map((image) => ({
      id: image.id,
      roadtripId: image.roadtrip_id,
      url: blobs.find((blob) => blob.pathname === image.uuid)?.url!,
      position: new LngLat(image.position.coordinates[0], image.position.coordinates[1]),
      description: image.description,
      width: image.orientation === 'landscape' ? 300 : 200,
    }))
    .filter((image) => !!image.url);

  return NextResponse.json({ locales, images });
}
