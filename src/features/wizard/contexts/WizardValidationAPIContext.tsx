import { createContext } from "react";

type WizardValidationAPIContextType = () => Promise<boolean>;

export const WizardValidationAPIContext = createContext<WizardValidationAPIContextType | null>(null);