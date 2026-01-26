import { createContext } from "react";

type WizardValidationAPIContextType = () => boolean;

export const WizardValidationAPIContext = createContext<WizardValidationAPIContextType | null>(null);