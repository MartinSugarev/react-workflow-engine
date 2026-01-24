import { createContext } from 'react'

interface WizardAPIContextProps {
   updateNextStep: (stepId: string) => void;
   goToStep: (stepId: number) => void;
   updateStepData: (stepId: string) => void; 
}

export const WizardAPIContext = createContext<WizardAPIContextProps | null>(null);
