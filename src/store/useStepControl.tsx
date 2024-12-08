import { create } from "zustand";
interface useStepControlState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep:(value:number)=>void
}
export const useStepControl = create<useStepControlState>((set, get) => ({
  step: 0,
  setStep:(value:number)=>set({step:value}),
  nextStep: () => {
    const currentStep = get().step;
    set({ step: currentStep + 1 });
  },
  prevStep: () => {
    const currentStep = get().step;
    if (currentStep > 0) {
      set({ step: currentStep - 1 });
    }
  },
}));
