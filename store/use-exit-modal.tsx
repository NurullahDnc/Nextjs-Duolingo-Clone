import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExitModal = create<ExitModalState>((set) => ({
  //baslangıcta false, set func. kulanarak guncelle
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
