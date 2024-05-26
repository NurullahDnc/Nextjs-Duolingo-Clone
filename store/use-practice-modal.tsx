import { create } from "zustand";

type PracticeModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const usePracticeModal = create<PracticeModalState>((set) => ({
  //baslangıcta false, set func. kulanarak guncelle
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
