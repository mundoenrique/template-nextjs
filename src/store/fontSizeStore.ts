import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  fontSize: number;
};

type Actions = {
  addCount: () => void;
  removeCount: () => void;
};

export const useFontSizeStore = create<Store & Actions>()(
  persist(
    (set) => ({
      fontSize: 0,
      addCount: () => set((state: any) => ({ fontSize: state.fontSize + 1 })),
      removeCount: () => set((state: any) => ({ fontSize: state.fontSize - 1 })),
    }),
    {
      name: 'accessibility',
      version: undefined,
    }
  )
);
