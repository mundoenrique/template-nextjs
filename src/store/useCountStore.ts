import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  count: number;
};

type Actions = {
  addCount: () => void;
  removeCount: () => void;
  resetCount: () => void;
};

// the store itself does not need any change
export const useCountStore = create<Store & Actions>()(
  persist(
    (set) => ({
      count: 1,
      addCount: () => set((state: any) => ({ count: state.count + 1 })),
      removeCount: () => set((state: any) => ({ count: state.count - 1 })),
      resetCount: () => set(() => ({ count: 0 })),
    }),
    {
      name: 'global',
    }
  )
);
