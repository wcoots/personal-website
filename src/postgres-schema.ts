export type TrigID = `TP${number}`;

export enum TrigHistoricUse {
  Primary = 'Primary',
  Secondary = 'Secondary',
  ThirdOrder = '3rd order',
  FourthOrder = '4th order',
  ThirteenthOrder = '13th order',
  HydrographicSurveyStation = 'Hydrographic Survey Station',
  ProjectEmily = 'Project Emily',
  GreatGlenProject = 'Great Glen Project',
  Other = 'Other',
  Unknown = 'Unknown',
}

export enum TrigCurrentUse {
  PassiveStation = 'Passive station',
  NCEAdjustment = 'NCE Adjustment',
}

export enum TrigCondition {
  Good = 'Good',
  SlightlyDamaged = 'Slightly damaged',
  Damaged = 'Damaged',
  Toppled = 'Toppled',
  Destroyed = 'Destroyed',
  Converted = 'Converted',
  Remains = 'Remains',
  Unknown = 'Unknown',
  PossiblyMissing = 'Possibly missing',
  Moved = 'Moved',
  UnreachableButVisible = 'Unreachable but visible',
  Inaccessible = 'Inaccessible',
}

export enum TrigCountry {
  England = 'England',
  Wales = 'Wales',
  Scotland = 'Scotland',
  Ireland = 'Ireland',
  IsleOfMan = 'Isle of Man',
}

export enum NationalPark {
  Dartmoor = 'dartmoor',
  Exmoor = 'exmoor',
  LakeDistrict = 'lake district',
  NewForest = 'new forest',
  NorthYorksMoors = 'north yorks moors',
  Northumberland = 'northumberland',
  PeakDistrict = 'peak district',
  SouthDowns = 'south downs',
  YorkshireDales = 'yorkshire dales',
}

export enum AreaOfNaturalBeauty {
  ArnsideSilverdale = 'arnside & silverdale',
  BlackdownHills = 'blackdown hills',
  CannockChase = 'cannock chase',
  ChichesterHarbour = 'chichester harbour',
  Chilterns = 'chilterns',
  Cornwall = 'cornwall',
  Cotswolds = 'cotswolds',
  CranborneChaseWestWiltshireDowns = 'cranborne chase & west wiltshire downs',
  Dorset = 'dorset',
  EastDevon = 'east devon',
  ForestOfBowland = 'forest of bowland',
  HighWeald = 'high weald',
  HowardianHills = 'howardian hills',
  IsleOfWight = 'isle of wight',
  IslesOfScilly = 'isles of scilly',
  KentDowns = 'kent downs',
  LincolnshireWolds = 'lincolnshire wolds',
  MalvernHills = 'malvern hills',
  MendipHills = 'mendip hills',
  Nidderdale = 'nidderdale',
  NorfolkCoast = 'norfolk coast',
  NorthDevon = 'north devon',
  NorthPennines = 'north pennines',
  NorthWessexDowns = 'north wessex downs',
  NorthumberlandCoast = 'northumberland coast',
  QuantockHills = 'quantock hills',
  ShropshireHills = 'shropshire hills',
  SolwayCoast = 'solway coast',
  SouthDevon = 'south devon',
  SuffolkCoastHeaths = 'suffolk coast & heaths',
  SurreyHills = 'surrey hills',
  TamarValley = 'tamar valley',
  WyeValley = 'wye valley',
}

export interface TrigTable {
  id: TrigID;
  name: string;
  latitude: number;
  longitude: number;
  historic_use: TrigHistoricUse | null;
  current_use: TrigCurrentUse | null;
  condition: TrigCondition;
  country: TrigCountry;
  height_feet: number | null;
  height_metres: number | null;
  national_park: NationalPark | null;
  aonb: AreaOfNaturalBeauty | null;
}

export interface Database {
  'database.trig_pillars': TrigTable;
}
