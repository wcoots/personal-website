import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/kysely';
import { Roadtrip } from '@/types';

export async function GET(_: NextRequest): Promise<NextResponse> {
  const roadtrips: Roadtrip[] = await db
    .selectFrom('database.roadtrips as roadtrips')
    .select(['roadtrips.id', 'roadtrips.name', 'roadtrips.description'])
    .orderBy('roadtrips.id asc')
    .execute();

  return NextResponse.json(roadtrips);
}
