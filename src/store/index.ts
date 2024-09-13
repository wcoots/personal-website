import { create } from 'zustand';
import { produce } from 'immer';
import { TrigTable as TrigPoint, TrigCondition, TrigCountry, NationalPark, AONB } from '@/postgres-schema';

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
  trigSettings: {
    countries: TrigCountrySettings;
    conditions: TrigConditionSettings;
    nationalParks: NationalParkSettings;
    aonbs: AONBSettings;
  };
  setTrigPoints(trigPoints: TrigPoint[]): void;
  setSelectedTrigPoint(trigPoint: TrigPoint | null): void;
  setTrigCountrySetting(trigCountry: TrigCountry, value: boolean): void;
  setTrigConditionSetting(trigCondition: TrigCondition, value: boolean): void;
  setNationalParkSetting(nationalPark: NationalPark, value: boolean): void;
  setAONBSetting(aonb: AONB, value: boolean): void;
}

export const useStore = create<State>((set) => ({
  trigPoints: null,
  selectedTrigPoint: null,
  trigSettings: {
    countries: {
      [TrigCountry.England]: true,
      [TrigCountry.Wales]: true,
      [TrigCountry.Scotland]: true,
      [TrigCountry.Ireland]: true,
      [TrigCountry.IsleOfMan]: true,
    },
    conditions: {
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
    nationalParks: {
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
    aonbs: {
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
  },
  setTrigPoints: (trigPoints) => set({ trigPoints }),
  setSelectedTrigPoint: (selectedTrigPoint) => set({ selectedTrigPoint }),
  setTrigCountrySetting: (trigCountry, value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.countries[trigCountry] = value;
      }),
    ),
  setTrigConditionSetting: (trigCondition, value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.conditions[trigCondition] = value;
      }),
    ),
  setNationalParkSetting: (nationalPark, value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.nationalParks[nationalPark] = value;
      }),
    ),
  setAONBSetting: (aonb, value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.aonbs[aonb] = value;
      }),
    ),
}));
