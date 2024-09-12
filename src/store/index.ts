import { create } from 'zustand';

interface Store {}

export const store = create<Store>((set) => ({}));
