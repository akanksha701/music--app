
import { create } from 'zustand';

interface States {
  isOpen: boolean;
}

interface Actions {
  onOpen: () => void;
  onClose: () => void;
}

export const useMusicAddModal = create<States & Actions>((set) => ({
  isOpen: false,
    
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));