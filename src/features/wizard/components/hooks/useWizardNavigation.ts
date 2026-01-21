import { useContext } from "react";
import { WizardNavigationContext } from "../../contexts/WizardNavigationContext";

export default function useWizardNavigation(){
  const context = useContext(WizardNavigationContext);
  if (context === undefined) {
    throw new Error('useWizardNavigation must be used within a WizardProvider');
  }
  return context;
};