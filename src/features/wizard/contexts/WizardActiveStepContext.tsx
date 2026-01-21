import React, { createContext, ReactNode, useContext } from 'react'
import { WizardNavigationContext } from '../WizardProvider';

export interface WizardActiveStepContextProps {
    activeStepIndex: number;
    activeStepConfig: StepConfig;
    activeStepStoredData: Record<string, string>
}

interface WizardActiveStepContextProviderProps {
    children: ReactNode;
}


 
export const WizardActiveStepContext = createContext<WizardActiveStepContextProps | null>(null)
export default function WizardActiveStepContextProvider({children}: WizardActiveStepContextProviderProps) {
  const content = useContext(WizardNavigationContext)  
  console.log('CONTEENT', content);
  
  if(!content) return
  const { activeStepIndex, storedData, stepsConfig, entryPoint } = content
  return (
    <WizardActiveStepContext.Provider value={{activeStepIndex, activeStepConfig: stepsConfig[entryPoint], activeStepStoredData: storedData}}>
        {children}
    </WizardActiveStepContext.Provider>
  )
}
