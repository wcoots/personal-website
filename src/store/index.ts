import { create } from 'zustand';
import { TrigTable as TrigPoint, TrigCondition, TrigCountry, NationalPark } from '@/postgres-schema';

export type TrigCountrySettings = {
  [key in TrigCountry]: boolean;
};

export type TrigConditionSettings = {
  [key in TrigCondition]: boolean;
};

export type NationalParkSettings = {
  [key in NationalPark]: boolean;
} & { none: boolean };

export type AONBSettings = {
  [key in AONB]: boolean;
} & { none: boolean };

interface State {
  trigPoints: TrigPoint[] | null;
  selectedTrigPoint: TrigPoint | null;
  trigCountrySettings: TrigCountrySettings;
  trigConditionSettings: TrigConditionSettings;
  nationalParkSettings: NationalParkSettings;
  aonbSettings: AONBSettings;
  setTrigPoints: (trigPoints: TrigPoint[]) => void;
  setSelectedTrigPoint: (trigPoint: TrigPoint | null) => void;
  setTrigCountrySettings: (trigCountrySettings: TrigCountrySettings) => void;
  setTrigConditionSettings: (trigConditionSettings: TrigConditionSettings) => void;
  setNationalParkSettings: (nationalParkSettings: NationalParkSettings) => void;
  setAONBSettings: (aonbSettings: AONBSettings) => void;
}

export enum AONB {
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

export const useStore = create<State>((set) => ({
  trigPoints: null,
  selectedTrigPoint: null,
  trigCountrySettings: {
    [TrigCountry.England]: true,
    [TrigCountry.Wales]: true,
    [TrigCountry.Scotland]: true,
    [TrigCountry.Ireland]: true,
    [TrigCountry.IsleOfMan]: true,
  },
  trigConditionSettings: {
    [TrigCondition.Good]: true,
    [TrigCondition.SlightlyDamaged]: true,
    [TrigCondition.Damaged]: true,
    [TrigCondition.Toppled]: true,
    [TrigCondition.Destroyed]: true,
    [TrigCondition.Converted]: true,
    [TrigCondition.Remains]: true,
    [TrigCondition.Unknown]: true,
    [TrigCondition.PossiblyMissing]: true,
    [TrigCondition.Moved]: true,
    [TrigCondition.UnreachableButVisible]: true,
    [TrigCondition.Inaccessible]: true,
  },
  nationalParkSettings: {
    none: true,
    [NationalPark.Dartmoor]: true,
    [NationalPark.Exmoor]: true,
    [NationalPark.LakeDistrict]: true,
    [NationalPark.NewForest]: true,
    [NationalPark.NorthYorksMoors]: true,
    [NationalPark.Northumberland]: true,
    [NationalPark.PeakDistrict]: true,
    [NationalPark.SouthDowns]: true,
    [NationalPark.YorkshireDales]: true,
  },
  aonbSettings: {
    none: true,
    [AONB.ArnsideSilverdale]: true,
    [AONB.BlackdownHills]: true,
    [AONB.CannockChase]: true,
    [AONB.ChichesterHarbour]: true,
    [AONB.Chilterns]: true,
    [AONB.Cornwall]: true,
    [AONB.Cotswolds]: true,
    [AONB.CranborneChaseWestWiltshireDowns]: true,
    [AONB.Dorset]: true,
    [AONB.EastDevon]: true,
    [AONB.ForestOfBowland]: true,
    [AONB.HighWeald]: true,
    [AONB.HowardianHills]: true,
    [AONB.IsleOfWight]: true,
    [AONB.IslesOfScilly]: true,
    [AONB.KentDowns]: true,
    [AONB.LincolnshireWolds]: true,
    [AONB.MalvernHills]: true,
    [AONB.MendipHills]: true,
    [AONB.Nidderdale]: true,
    [AONB.NorfolkCoast]: true,
    [AONB.NorthDevon]: true,
    [AONB.NorthPennines]: true,
    [AONB.NorthWessexDowns]: true,
    [AONB.NorthumberlandCoast]: true,
    [AONB.QuantockHills]: true,
    [AONB.ShropshireHills]: true,
    [AONB.SolwayCoast]: true,
    [AONB.SouthDevon]: true,
    [AONB.SuffolkCoastHeaths]: true,
    [AONB.SurreyHills]: true,
    [AONB.TamarValley]: true,
    [AONB.WyeValley]: true,
  },
  setTrigPoints: (trigPoints) => set({ trigPoints }),
  setSelectedTrigPoint: (selectedTrigPoint) => set({ selectedTrigPoint }),
  setTrigCountrySettings: (trigCountrySettings) => set({ trigCountrySettings }),
  setTrigConditionSettings: (trigConditionSettings) => set({ trigConditionSettings }),
  setNationalParkSettings: (nationalParkSettings) => set({ nationalParkSettings }),
  setAONBSettings: (aonbSettings) => set({ aonbSettings }),
}));
