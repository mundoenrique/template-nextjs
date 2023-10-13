import { create } from 'zustand';

type puzzleState = {
  puzzle: string;
};

export const usePuzzleStore = create<puzzleState>((set) => ({
  puzzle: '',
}));
