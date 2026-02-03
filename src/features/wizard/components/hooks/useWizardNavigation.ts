import { useContext } from "react";
import { WizardNavigationContextData } from "../../contexts/WizardNavigationContext";

export default function useWizardNavigation() {
  const context = useContext(WizardNavigationContextData);
  if (!context) {
    throw new Error("useWizardNavigation must be used within a WizardProvider");
  }
  return context;
}