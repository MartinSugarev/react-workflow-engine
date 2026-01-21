import React, { createContext, ReactNode } from 'react'
import { traverseConfig } from '../utils/traverseConfig'; 
import { stepsConfig } from '../configs/steps-config';

export interface WizardNavigationContextType {
  navigationKeys: string[];
}

export interface WizardNavigationContextProviderProps {
  children: ReactNode
}

export const WizardNavigationContext = createContext<WizardNavigationContextType | undefined>(undefined);


export default function WizardNavigationContextProvider({children}: WizardNavigationContextProviderProps){
   
   const steps = traverseConfig(stepsConfig, 'start')   //// The second argument needs to be added dinamicaly

  return (
      <WizardNavigationContext.Provider value={{navigationKeys: steps}}>
         {children}
      </WizardNavigationContext.Provider>
   )
}