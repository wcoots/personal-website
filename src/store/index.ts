import { create } from 'zustand';
import { produce } from 'immer';
import {
  TrigTable as TrigPoint,
  TrigCondition,
  TrigCountry,
  NationalPark,
  AreaOfNaturalBeauty,
} from '@/postgres-schema';

export type TrigCountrySettings = {
  [key in TrigCountry]: boolean;
};

export type TrigConditionSettings = {
  [key in TrigCondition]: boolean;
};

export type NationalParkSettings = {
  [key in NationalPark]: boolean;
} & { 'n/a': boolean };

export type AONBSettings = {
  [key in AreaOfNaturalBeauty]: boolean;
} & { 'n/a': boolean };

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
  setAONBSetting(aonb: AreaOfNaturalBeauty, value: boolean): void;
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
      'n/a': true,
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
      'n/a': true,
      [AreaOfNaturalBeauty.ArnsideSilverdale]: true,
      [AreaOfNaturalBeauty.BlackdownHills]: true,
      [AreaOfNaturalBeauty.CannockChase]: true,
      [AreaOfNaturalBeauty.ChichesterHarbour]: true,
      [AreaOfNaturalBeauty.Chilterns]: true,
      [AreaOfNaturalBeauty.Cornwall]: true,
      [AreaOfNaturalBeauty.Cotswolds]: true,
      [AreaOfNaturalBeauty.CranborneChaseWestWiltshireDowns]: true,
      [AreaOfNaturalBeauty.Dorset]: true,
      [AreaOfNaturalBeauty.EastDevon]: true,
      [AreaOfNaturalBeauty.ForestOfBowland]: true,
      [AreaOfNaturalBeauty.HighWeald]: true,
      [AreaOfNaturalBeauty.HowardianHills]: true,
      [AreaOfNaturalBeauty.IsleOfWight]: true,
      [AreaOfNaturalBeauty.IslesOfScilly]: true,
      [AreaOfNaturalBeauty.KentDowns]: true,
      [AreaOfNaturalBeauty.LincolnshireWolds]: true,
      [AreaOfNaturalBeauty.MalvernHills]: true,
      [AreaOfNaturalBeauty.MendipHills]: true,
      [AreaOfNaturalBeauty.Nidderdale]: true,
      [AreaOfNaturalBeauty.NorfolkCoast]: true,
      [AreaOfNaturalBeauty.NorthDevon]: true,
      [AreaOfNaturalBeauty.NorthPennines]: true,
      [AreaOfNaturalBeauty.NorthWessexDowns]: true,
      [AreaOfNaturalBeauty.NorthumberlandCoast]: true,
      [AreaOfNaturalBeauty.QuantockHills]: true,
      [AreaOfNaturalBeauty.ShropshireHills]: true,
      [AreaOfNaturalBeauty.SolwayCoast]: true,
      [AreaOfNaturalBeauty.SouthDevon]: true,
      [AreaOfNaturalBeauty.SuffolkCoastHeaths]: true,
      [AreaOfNaturalBeauty.SurreyHills]: true,
      [AreaOfNaturalBeauty.TamarValley]: true,
      [AreaOfNaturalBeauty.WyeValley]: true,
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
