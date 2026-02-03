import { useCallback, useMemo, useReducer, ReactNode, useEffect } from "react";
import { WIZARD_ACTIONS } from "./actions";
import { wizardReducer } from "./reducers/wizardReducer";
import { traverseConfig } from "./utils/traverseConfig";
import { WizardDataContext } from "./contexts/WizardDataContext";
import { WizardActiveStepContext } from "./contexts/WizardActiveStepContext";
import { WizardAPIContext } from "./contexts/WizardAPIContext";
import { WizardNavigationContextData } from "./contexts/WizardNavigationContext";
import { WizardInvalidStepsContext } from "./contexts/WizardInvalidStepContext";
import { WizardValidationAPIContext } from "./contexts/WizardValidationAPIContext";
import { isWizardLocalStorageDataType, JSONparse } from "./utils/jsonParse";
import { stepValidationSecondEdition } from "./utils/stepValidation";

export type StepConfigPersisted = Omit<StepConfig, "content">;
export type StepsConfigPersisted = Record<string, StepConfigPersisted>;
interface WizardProviderProps {
  children: ReactNode;
  stepsConfig: Record<string, StepConfig>;
  validationCallback: () => boolean | Promise<boolean>;
}

export interface WizardLocalStorageDataType {
  activeStepIndex: number;
  stepsConfig: StepsConfigPersisted;
  invalidSteps: string[];
  storedData: Record<string, string>;
}

const stateInit = (base: WizardState): WizardState => {
  const rawWizardLocalStorageData = localStorage.getItem("wizardState");
  if (!rawWizardLocalStorageData) return base;
  const JSONparsedStorage = JSONparse<WizardLocalStorageDataType>(
    rawWizardLocalStorageData,
  );

  if (!isWizardLocalStorageDataType(JSONparsedStorage)) return base;
  const currentActiveStepIndex =
    JSONparsedStorage.activeStepIndex ?? base.activeStepIndex;
  const invalidSteps = JSONparsedStorage.invalidSteps ?? base.invalidSteps;
  const storedData = JSONparsedStorage.storedData ?? base.storedData;

  const mergedStepsConfig: Record<string, StepConfig> = {};
  for (const [k, v] of Object.entries(base.stepsConfig)) {
    const persistedNextStep = JSONparsedStorage.stepsConfig?.[k];

    mergedStepsConfig[k] = {
      ...v,
      nextStep:
        persistedNextStep !== undefined
          ? persistedNextStep.nextStep
          : v.nextStep,
    };
  }

  const nextNavigationKeys = traverseConfig(mergedStepsConfig, base.entryPoint);

  return {
    ...base,
    stepsConfig: mergedStepsConfig,
    navigationKeys: nextNavigationKeys,
    activeStepIndex: currentActiveStepIndex,
    invalidSteps: invalidSteps,
    storedData: storedData,
  };
};

const WizardProvider: React.FC<WizardProviderProps> = ({
  stepsConfig,
  children,
  validationCallback,
}) => {
  const initialState: WizardState = {
    stepsConfig,
    activeStepIndex: 0,
    storedData: {},
    navigationKeys: traverseConfig(stepsConfig, "start"),
    entryPoint: "start",
    invalidSteps: [],
  };

  const [state, dispatch] = useReducer(wizardReducer, initialState, stateInit);

  useEffect(() => {
    let stepConfigPersistedObject: StepsConfigPersisted = {};
    for (const [k, { content, ...rest }] of Object.entries(state.stepsConfig)) {
      stepConfigPersistedObject[k] = rest;
    }

    localStorage.setItem(
      "wizardState",
      JSON.stringify({
        activeStepIndex: state.activeStepIndex,
        stepsConfig: stepConfigPersistedObject,
        invalidSteps: state.invalidSteps,
        storedData: state.storedData,
      }),
    );
  }, [
    state.activeStepIndex,
    state.stepsConfig,
    state.invalidSteps,
    state.storedData,
  ]);

  const activeStepData = useMemo(() => {
    return {
      activeStepIndex: state.activeStepIndex,
      activeStepConfig:
        state.stepsConfig[state.navigationKeys[state.activeStepIndex]],
      activeStepStoredData:
        state.storedData[state.navigationKeys[state.activeStepIndex]],
    };
  }, [
    state.activeStepIndex,
    state.navigationKeys,
    state.storedData,
    state.stepsConfig,
  ]);

  const goToStep = useCallback(
    async (stepIndex: number) => {
      let isValid: boolean;

      let result = await stepValidationSecondEdition();
      isValid = result;

      dispatch({ type: WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX, stepIndex });
      dispatch({ type: WIZARD_ACTIONS.UPDATE_INVALID_STEPS, isValid });
    },
    [validationCallback],
  );

  const updateStepData = useCallback((data: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STORED_DATA, stepData: data });
  }, []);

  const updateNextStep = useCallback((nextStepId: string) => {
    dispatch({ type: WIZARD_ACTIONS.UPDATE_STEPS_CONFIG, nextStepId });
  }, []);

  const resetSteps = useCallback(() => {
    localStorage.removeItem("wizardState");
    dispatch({
      type: WIZARD_ACTIONS.RESET_STEPS_CONFIG,
      initialStepsConfig: stepsConfig,
    });
  }, [stepsConfig]);

  const apiValue = useMemo(
    () => ({ goToStep, updateNextStep, updateStepData, resetSteps }),
    [goToStep, updateNextStep, updateStepData, resetSteps],
  );

  return (
    <WizardNavigationContextData.Provider value={state.navigationKeys}>
      <WizardValidationAPIContext.Provider value={stepValidationSecondEdition}>
        <WizardInvalidStepsContext.Provider value={state.invalidSteps}>
          <WizardAPIContext.Provider value={apiValue}>
            <WizardActiveStepContext.Provider value={activeStepData}>
              <WizardDataContext.Provider value={state.storedData}>
                {children}
              </WizardDataContext.Provider>
            </WizardActiveStepContext.Provider>
          </WizardAPIContext.Provider>
        </WizardInvalidStepsContext.Provider>
      </WizardValidationAPIContext.Provider>
    </WizardNavigationContextData.Provider>
  );
};

export default WizardProvider;