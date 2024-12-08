import { create } from "zustand";
interface useEditOrderState {
  oredrId: number | null;
  setOrderId: (id: number) => void;
  isOpen: boolean;
  setIsOpen: () => void;
  close: () => void;
}
export const useEditOrderStore = create<useEditOrderState>((set) => ({
  oredrId: null,
  setOrderId: (id: number) => set({ oredrId: id }),
  isOpen: false,
  setIsOpen: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
