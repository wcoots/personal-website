import { create } from 'zustand';

export type InformationPanelState = 'closed' | 'open';

interface InformationPanelStore {
  height: number;
  setHeight(height: number): void;
  mostRecentState: InformationPanelState;
  setMostRecentState(state: InformationPanelState): void;
}

export const informationPanelStore = create<InformationPanelStore>((set) => ({
  height: 0,
  setHeight: function (height: number) {
    set(() => ({ height }));
  },
  mostRecentState: 'closed',
  setMostRecentState: function (state: InformationPanelState) {
    set(() => ({ mostRecentState: state }));
  },
}));
