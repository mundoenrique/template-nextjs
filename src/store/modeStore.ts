import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ModeState = {
  mode: string;
  changeMode: (lang: string) => void;
};

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'light',
      changeMode: (mode) => set(() => ({ mode: mode })),
    }),
    {
      name: 'mode',
    }
  )
);
