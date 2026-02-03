import { createContext } from "react";
export interface WizardActiveStepContextProps {
  activeStepIndex: number;
  activeStepConfig: StepConfig;
  activeStepStoredData?: string;
}

export const WizardActiveStepContext =
  createContext<WizardActiveStepContextProps | null>(null);