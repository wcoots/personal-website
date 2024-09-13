import { create } from 'zustand';
import { TrigTable as TrigPoint } from '@/postgres-schema';

interface State {
  trigPoints: TrigPoint[] | null;
  selectedTrigPoint: TrigPoint | null;
  setTrigPoints: (trigPoints: TrigPoint[]) => void;
  setSelectedTrigPoint: (trigPoint: TrigPoint | null) => void;
}

export const useStore = create<State>((set) => ({
  trigPoints: null,
  selectedTrigPoint: null,
  setTrigPoints: (trigPoints) => set({ trigPoints }),
  setSelectedTrigPoint: (selectedTrigPoint) => set({ selectedTrigPoint }),
}));
