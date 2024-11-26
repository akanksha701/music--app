// Directory: /app/counter/_store/index.ts

import { create } from 'zustand';

// State types
interface States {
  isOpen: boolean;
}

// Action types
interface Actions {
  onOpen: () => void;
  onClose: () => void;
}

// useCounterStore
export const useMusicAddModal = create<States & Actions>((set) => ({
  isOpen: false,
    
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));