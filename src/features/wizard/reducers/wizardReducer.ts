import { WIZARD_ACTIONS } from "../actions";
import { traverseConfig } from "../utils/traverseConfig";

export const wizardReducer = (
  state: WizardState,
  action: WizardAction,
): WizardState => {
  const activeStepKey = state.navigationKeys[state.activeStepIndex];
  switch (action.type) {
    case WIZARD_ACTIONS.UPDATE_STEPS_CONFIG: {
      if (!action.nextStepId) {
        return state;
      }

      const nextStepsConfig = {
        ...state.stepsConfig,
        [activeStepKey]: {
          ...state.stepsConfig[activeStepKey],
          nextStep: action.nextStepId,
        },
      };

      const nextNavigationKeys = traverseConfig(
        nextStepsConfig,
        state.entryPoint,
      );

      return {
        ...state,
        stepsConfig: nextStepsConfig,
        navigationKeys: nextNavigationKeys,
      };
    }

    case WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX:
      if (action.stepIndex === undefined || action.stepIndex === null) {
        return state;
      }

      let nextIndex = action.stepIndex;
      if (nextIndex < 0) {
        nextIndex = 0;
      }

      if (nextIndex > state.navigationKeys.length - 1) {
        nextIndex = state.navigationKeys.length - 1;
      }

      return {
        ...state,
        activeStepIndex: nextIndex,
      };

    case WIZARD_ACTIONS.UPDATE_STORED_DATA:
      if (!action.stepData) {
        return state;
      }
      return {
        ...state,
        storedData: {
          ...state.storedData,
          [activeStepKey]: action.stepData,
        },
      };

    case WIZARD_ACTIONS.UPDATE_INVALID_STEPS:
      const setOfInvalidSteps = new Set([...state.invalidSteps]);

      if (action.isValid) {
        setOfInvalidSteps.delete(activeStepKey);
      } else {
        setOfInvalidSteps.add(activeStepKey);
      }

      return {
        ...state,
        invalidSteps: Array.from(setOfInvalidSteps),
      };
    case WIZARD_ACTIONS.RESET_STEPS_CONFIG:
      if (!action.initialStepsConfig) {
        return state;
      }
      const nextNavigationKeys = traverseConfig(
        action.initialStepsConfig,
        state.entryPoint,
      );
      return {
        ...state,
        stepsConfig: action.initialStepsConfig,
        navigationKeys: nextNavigationKeys,
        activeStepIndex: 0,
        invalidSteps: [],
        storedData: {},
      };
    default:
      return state;
  }
};