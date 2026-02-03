import { useContext } from "react";
import { WizardDataContext } from "../../contexts/WizardDataContext";

export default function useWizardDataCotext() {
  const context = useContext(WizardDataContext);
  if (!context) {
    throw new Error("useWizardDataCotext must be used within a WizardProvider");
  }
  return context;
}