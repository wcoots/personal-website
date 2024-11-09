import { Roadtrip, Locale } from '@/types';
import { create } from 'zustand';

interface State {
  roadtrips: Roadtrip[] | null;
  selectedRoadtripId: number | null;
  roadtripLocales: Locale[] | null;
  setRoadTrips: (roadtrips: Roadtrip[]) => void;
  setSelectedRoadtripId: (selectedRoadtrip: number | null) => void;
  setRoadtripLocales: (locales: Locale[] | null) => void;
}

export const useStore = create<State>((set) => ({
  roadtrips: null,
  selectedRoadtripId: null,
  roadtripLocales: null,
  setRoadTrips: (roadtrips: Roadtrip[]) => set({ roadtrips }),
  setSelectedRoadtripId: (selectedRoadtripId: number | null) => set({ selectedRoadtripId }),
  setRoadtripLocales: (roadtripLocales: Locale[] | null) => set({ roadtripLocales }),
}));
