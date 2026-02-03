import { useContext } from "react";
import { WizardInvalidStepsContext } from "../../contexts/WizardInvalidStepContext";

export default function useWizardInvalidStepsContext() {
  const context = useContext(WizardInvalidStepsContext);
  if (!context) {
    throw new Error(
      "useWizardInvalidStepsContext must be used within a WizardProvider",
    );
  }
  return context;
}