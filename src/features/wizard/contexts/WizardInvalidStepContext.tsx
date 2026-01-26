import { createContext } from "react";

type WizardInvalidStepsContextType = string[]

export const WizardInvalidStepsContext = createContext<WizardInvalidStepsContextType | null>(null)