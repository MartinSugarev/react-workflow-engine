interface StepConfig {
  title: string;
  content: React.ReactElement;
  options?: { stepId: string }[];  // For branching flows
  nextStep: string | null;         // null = final step
}

interface WizardState {
  stepsConfig: Record<string, StepConfig>;
  navigationKeys: string[];        // Ordered list of step keys
  activeStepIndex: number;
  storedData: Record<string, string>;
  entryPoint: string;
  invalidSteps: string[];
}

interface WizardAction {
//   type: WizardActionType;
  nextStepId?: string;
  stepIndex?: number;
  stepData?: string;
  isValid?: boolean;
}