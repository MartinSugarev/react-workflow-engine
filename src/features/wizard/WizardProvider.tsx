import {
  useCallback,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { WIZARD_ACTIONS } from "./actions";
import { wizardReducer } from "./reducers/wizardReducer";
import { traverseConfig } from "./utils/traverseConfig";
import { WizardDataContext } from "./contexts/WizardDataContext";
import { WizardActiveStepContext } from "./contexts/WizardActiveStepContext";
import { WizardAPIContext } from "./contexts/WizardAPIContext";
import { WizardNavigationContextData } from "./contexts/WizardNavigationContext";
import { WizardInvalidStepsContext } from "./contexts/WizardInvalidStepContext";
import { WizardValidationAPIContext } from "./contexts/WizardValidationAPIContext";

interface WizardProviderProps {
  children: ReactNode;
  stepsConfig: Record<string, StepConfig>;
  validationCallback: () => boolean;
}

export const WizardProvider = ({
  stepsConfig,
  children,
  validationCallback,
}: WizardProviderProps) => {
  const [state, dispatch] = useReducer(wizardReducer, {
    stepsConfig,
    activeStepIndex: 0,
    storedData: {},
    navigationKeys: traverseConfig(stepsConfig, "start"),
    entryPoint: "start",
    invalidSteps: [],
  });
  // Memoize each context value with specific dependencies
  const navigationValue = useMemo(
    () => state.navigationKeys,
    [state.navigationKeys], // Only re-creates when navigationKeys change
  );

  const validationValue = useMemo(
    () => validationCallback,
    [validationCallback],
  );

  const invalidStepsData = useMemo(
    () => state.invalidSteps,
    [state.invalidSteps],
  );

  const storedData = useMemo(
    () => state.storedData,
    [state.storedData],
  );

  const activeStepData = useMemo(
    () => ({
      activeStepIndex: state.activeStepIndex,
      activeStepConfig:
        stepsConfig[state.navigationKeys[state.activeStepIndex]],
      activeStepStoredData:
        state.storedData[state.navigationKeys[state.activeStepIndex]],
    }),
    [
      state.activeStepIndex,
      state.navigationKeys,
      state.storedData,
      stepsConfig,
    ],
  );

  // Create stable API functions
  const goToStep = useCallback((stepIndex: number) => {
    const isValid = validationCallback();
    dispatch({ type: WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX, stepIndex });
    dispatch({ type: WIZARD_ACTIONS.UPDATE_INVALID_STEPS, isValid });
  }, [validationCallback]); // Empty deps = function never changes

  const updateStepData = useCallback((data: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STORED_DATA, stepData: data });
  }, []);

  const updateNextStep = useCallback((nextStepId: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STEPS_CONFIG, nextStepId });
  }, []);

  const apiValue = useMemo(
    () => ({ goToStep, updateNextStep, updateStepData }),
    [goToStep, updateNextStep, updateStepData],
  );

  return (
    <WizardNavigationContextData.Provider value={navigationValue}>
      <WizardValidationAPIContext.Provider value={validationValue}>
        <WizardInvalidStepsContext.Provider value={invalidStepsData}>
          <WizardAPIContext.Provider
            value={apiValue}
          >
            <WizardActiveStepContext.Provider
              value={activeStepData}
            >
              <WizardDataContext.Provider value={storedData}>
                {children}
              </WizardDataContext.Provider>
            </WizardActiveStepContext.Provider>
          </WizardAPIContext.Provider>
        </WizardInvalidStepsContext.Provider>
      </WizardValidationAPIContext.Provider>
    </WizardNavigationContextData.Provider>
  );
};