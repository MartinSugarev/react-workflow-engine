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

type WizardActionType = 'UPDATE_INVALID_STEPS' | 'UPDATE_STORED_DATA' | 'UPDATE_ACTIVE_STEP_INDEX' | 'UPDATE_STEPS_CONFIG' | 'RESET_STEPS_CONFIG'

interface WizardAction {
  type: WizardActionType;
  nextStepId?: string;
  stepIndex?: number;
  stepData?: string;
  isValid?: boolean;
  initialStepsConfig?: Record<string, StepConfig>;
}