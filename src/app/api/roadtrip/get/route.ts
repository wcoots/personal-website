import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/kysely';
import { Roadtrip } from '@/types';

export async function GET(_: NextRequest): Promise<NextResponse> {
  const roadtrips: Roadtrip[] = await db
    .selectFrom('database.roadtrips')
    .select(['id', 'name', 'description'])
    .orderBy('id asc')
    .execute();

  return NextResponse.json(roadtrips);
}
