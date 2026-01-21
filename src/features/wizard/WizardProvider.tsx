import { useCallback, useMemo, useReducer, createContext, ReactNode, useEffect } from "react";
import { WIZARD_ACTIONS } from "./actions";
import { wizardReducer } from "./reducers/wizardReducer";
import { traverseConfig } from "./utils/traverseConfig";

interface WizardProviderProps {
    children: ReactNode;
    stepsConfig: Record<string, StepConfig>;
    // validationCallback: () => void;
}

export const WizardNavigationContext = createContext<WizardState | null>(null)
export const WizardProvider = ({
  stepsConfig,
  children,
  // validationCallback,
}: WizardProviderProps) => {
  const [state, dispatch] = useReducer(wizardReducer, {
    stepsConfig,
    activeStepIndex: 0,
    storedData: {},
    navigationKeys: traverseConfig(stepsConfig, 'start'),
    entryPoint: 'start',
    invalidSteps: [],
  });
  // Memoize each context value with specific dependencies
  const navigationValue = useMemo(
    () => ({ navigationKeys: state.navigationKeys }),
    [state.navigationKeys]  // Only re-creates when navigationKeys change
  );

  // Create stable API functions
  const goToStep = useCallback((stepIndex: number) => {
    // dispatch({ type: WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX, stepIndex });
  }, []);  // Empty deps = function never changes

  // Nest all providers
  

  return (
    <WizardNavigationContext.Provider value={state}>
      {/* ... other providers ... */}
      {children}
    </WizardNavigationContext.Provider>
  );
};