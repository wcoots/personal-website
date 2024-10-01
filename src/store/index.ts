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

export type NationalParkAndAreaOfNaturalBeautySettings = {
  [key in NationalPark | AreaOfNaturalBeauty]: boolean;
} & { 'n/a': boolean };

export type Settings = TrigConditionSettings | TrigCountrySettings | NationalParkAndAreaOfNaturalBeautySettings;

interface State {
  trigPoints: TrigPoint[] | null;
  selectedTrigPoint: TrigPoint | null;
  trigSettings: {
    trig: boolean;
    countries: TrigCountrySettings;
    conditions: TrigConditionSettings;
    nationalParksAndAreasOfNaturalBeauty: NationalParkAndAreaOfNaturalBeautySettings;
  };
  setTrigPoints(trigPoints: TrigPoint[]): void;
  setSelectedTrigPoint(trigPoint: TrigPoint | null): void;
  setTrigSetting(value: boolean): void;
  setTrigCountrySetting(trigCountry: TrigCountry, value: boolean): void;
  setTrigConditionSetting(trigCondition: TrigCondition, value: boolean): void;
  setNationalParkAndAreaOfNaturalBeautySetting(
    nationalParkOrAreaOfNaturalBeauty: NationalPark | AreaOfNaturalBeauty,
    value: boolean,
  ): void;
}

export const useStore = create<State>((set) => ({
  trigPoints: null,
  selectedTrigPoint: null,
  trigSettings: {
    trig: true,
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
    nationalParksAndAreasOfNaturalBeauty: {
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
  setTrigSetting: (value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.trig = value;
      }),
    ),
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
  setNationalParkAndAreaOfNaturalBeautySetting: (nationalParkOrAreaOfNaturalBeauty, value) =>
    set(
      produce<State>((state) => {
        state.trigSettings.nationalParksAndAreasOfNaturalBeauty[nationalParkOrAreaOfNaturalBeauty] = value;
      }),
    ),
}));
