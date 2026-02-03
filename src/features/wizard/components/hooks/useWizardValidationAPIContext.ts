import { useContext } from "react";
import { WizardValidationAPIContext } from "../../contexts/WizardValidationAPIContext";

export default function useWizardValidationAPIContext() {
  const context = useContext(WizardValidationAPIContext);
  if (!context) {
    throw new Error(
      "useWizardValidationAPIContext must be used within a WizardProvider",
    );
  }
  return context;
}