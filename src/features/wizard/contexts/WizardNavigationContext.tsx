import { createContext } from 'react'

export type  WizardNavigationContextType = string[];

export const WizardNavigationContextData = createContext<WizardNavigationContextType | null>(null);