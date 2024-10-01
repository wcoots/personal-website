import { createKysely } from '@vercel/postgres-kysely';

import { Database } from '@/postgres-schema';

export const db = createKysely<Database>();
