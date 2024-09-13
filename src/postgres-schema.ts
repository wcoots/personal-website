export type TrigType =
  | 'Active station'
  | 'Berntsen'
  | 'Bolt'
  | 'Brass Plate'
  | 'Buried Block'
  | 'Cannon'
  | 'Concrete Ring'
  | 'Curry Stool'
  | 'Cut'
  | 'Disc'
  | 'FBM'
  | 'Fenomark'
  | 'Intersected Station'
  | 'Pillar'
  | 'Pipe'
  | 'Platform Bolt'
  | 'Rivet'
  | 'Spider'
  | 'Surface Block'
  | 'Other';

type TrigHistoricUse =
  | 'Primary'
  | 'Secondary'
  | 'Tertiary'
  | '1st order'
  | '2nd order'
  | '3rd order'
  | '4th order'
  | '13th order'
  | 'GPS'
  | 'Hydrographic Survey Station'
  | 'Project Emily'
  | 'Fundamental Benchmark'
  | 'Great Glen Project'
  | 'Unknown';

type TrigCurrentUse = 'Active station' | 'Passive station' | 'NCE Adjustment' | 'GPS Station';

type TrigCondition =
  | 'Good'
  | 'Slightly damaged'
  | 'Damaged'
  | 'Toppled'
  | 'Destroyed'
  | 'Converted'
  | 'Remains'
  | 'Not Logged'
  | 'Unknown'
  | 'Possibly missing'
  | 'Moved'
  | 'Unreachable but visible'
  | 'Inaccessible';

type TrigCountry = 'Scotland' | 'Scotland-England' | 'Isle of Man' | 'England' | 'Ireland' | 'Wales-England' | 'Wales';

type NationalPark =
  | 'exmoor'
  | 'the broads'
  | 'south downs'
  | 'dartmoor'
  | 'northumberland'
  | 'new forest'
  | 'north yorks moors'
  | 'lake district'
  | 'yorkshire dales'
  | 'peak district';

type AONB =
  | 'east devon'
  | 'malvern hills'
  | 'chilterns'
  | 'howardian hills'
  | 'cotswolds'
  | 'wye valley'
  | 'high weald'
  | 'lincolnshire wolds'
  | 'northumberland coast'
  | 'mendip hills'
  | 'forest of bowland'
  | 'north pennines'
  | 'tamar valley'
  | 'isles of scilly'
  | 'cranborne chase & west wiltshire downs'
  | 'shropshire hills'
  | 'surrey hills'
  | 'dorset'
  | 'cornwall'
  | 'chichester harbour'
  | 'arnside & silverdale'
  | 'south devon'
  | 'quantock hills'
  | 'blackdown hills'
  | 'north devon'
  | 'norfolk coast'
  | 'suffolk coast & heaths'
  | 'north wessex downs'
  | 'kent downs'
  | 'cannock chase'
  | 'solway coast'
  | 'dedham vale'
  | 'nidderdale'
  | 'isle of wight';

export interface TrigTable {
  id: `TP${number}`;
  name: string;
  latitude: number;
  longitude: number;
  type: TrigType;
  historic_use: TrigHistoricUse | null;
  current_use: TrigCurrentUse | null;
  condition: TrigCondition;
  country: TrigCountry;
  height_feet: number | null;
  height_metres: number | null;
  national_park: NationalPark | null;
  aonb: AONB | null;
}

export interface Database {
  'database.trig': TrigTable;
}
