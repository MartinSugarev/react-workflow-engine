import { createContext } from 'react'

type WizardDataContextProps = Record<string, string>
   
export const WizardDataContext = createContext<WizardDataContextProps | null>(null)
