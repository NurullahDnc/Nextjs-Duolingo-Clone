import { create } from "zustand";

type heartsModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useHeartsModal = create<heartsModalState>((set) => ({
  //baslangıcta false, set func. kulanarak guncelle
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
