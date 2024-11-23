import { create } from 'zustand';

interface GameState {
  gameState: 'menu' | 'playing' | 'paused' | 'gameOver';
  score: number;
  oxygenLevel: number;
  setGameState: (state: 'menu' | 'playing' | 'paused' | 'gameOver') => void;
  increaseScore: () => void;
  updateOxygen: (amount: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameState: 'menu',
  score: 0,
  oxygenLevel: 100,
  setGameState: (state) => set({ gameState: state }),
  increaseScore: () => set((state) => ({ score: state.score + 10 })),
  updateOxygen: (amount) => set((state) => ({ 
    oxygenLevel: Math.max(0, Math.min(100, state.oxygenLevel + amount))
  })),
  resetGame: () => set({ score: 0, oxygenLevel: 100, gameState: 'menu' }),
}));