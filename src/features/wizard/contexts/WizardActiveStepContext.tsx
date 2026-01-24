import { createContext } from 'react'
export interface WizardActiveStepContextProps {
    activeStepIndex: number;
    activeStepConfig: StepConfig;
    activeStepStoredData?: Record<string, string>
  }

export const WizardActiveStepContext = createContext<WizardActiveStepContextProps | null>(null)