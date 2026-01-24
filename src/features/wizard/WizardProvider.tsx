import {
  useCallback,
  useMemo,
  useReducer,
  createContext,
  ReactNode,
} from "react";
import { WIZARD_ACTIONS } from "./actions";
import { wizardReducer } from "./reducers/wizardReducer";
import { traverseConfig } from "./utils/traverseConfig";
import {WizardDataContext} from "./contexts/WizardDataContext";
import { WizardActiveStepContext } from "./contexts/WizardActiveStepContext";
import { WizardAPIContext } from "./contexts/WizardAPIContext";
import { WizardNavigationContextData } from "./contexts/WizardNavigationContext";

interface WizardProviderProps {
  children: ReactNode;
  stepsConfig: Record<string, StepConfig>;
  // validationCallback: () => void;
}

export const WizardNavigationContext = createContext<WizardState | null>(null);
export const WizardProvider = ({
  stepsConfig,
  children,
  // validationCallback,
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
    () => ({ navigationKeys: state.navigationKeys }),
    [state.navigationKeys], // Only re-creates when navigationKeys change
  );

  // Create stable API functions
  const goToStep = useCallback((stepIndex: number) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX, stepIndex });
  }, []); // Empty deps = function never changes

  const updateStepData = useCallback(( data: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STORED_DATA, stepData: data });
    console.log('data', state.storedData);
  }, [])

   const updateNextStep = useCallback((nextStepId: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STEPS_CONFIG, nextStepId});
    
  }, [])

  return (
    <WizardNavigationContext.Provider value={state}>
      <WizardAPIContext.Provider value={{ goToStep, updateNextStep, updateStepData }}>
        <WizardActiveStepContext.Provider
          value={{
            activeStepIndex: state.activeStepIndex,
            activeStepConfig: stepsConfig[state.navigationKeys[state.activeStepIndex]],
          }}
        >
          <WizardNavigationContextData.Provider value={state.navigationKeys}>
            <WizardDataContext.Provider value={state.storedData}>
              {children}
            </WizardDataContext.Provider>
          </WizardNavigationContextData.Provider>
        </WizardActiveStepContext.Provider>
      </WizardAPIContext.Provider>
    </WizardNavigationContext.Provider>
  );
};