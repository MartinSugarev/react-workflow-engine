import { useContext } from "react";
import { WizardAPIContext } from "../../contexts/WizardAPIContext";

export default function useWizardAPIContext() {
  const context = useContext(WizardAPIContext);
  if (!context) {
    throw new Error("useWizardAPIContext must be used within a WizardProvider");
  }
  return context;
}