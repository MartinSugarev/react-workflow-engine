import { WIZARD_ACTIONS } from "../actions";
import { traverseConfig } from "../utils/traverseConfig";

export const wizardReducer = (
  state: WizardState,
  action: WizardAction,
): WizardState => {
  const activeStepKey = state.navigationKeys[state.activeStepIndex];
  switch (action.type) {
    case WIZARD_ACTIONS.UPDATE_STEPS_CONFIG: {
      // Update the nextStep for current step, recalculate navigationKeys
      // Hint: Use traverseConfig utility to rebuild navigation order
      if (!action.nextStepId) {
        return {
          ...state,
        };
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
      // Update activeStepIndex

      if (action.stepIndex === undefined || action.stepIndex === null) {
        return {
          ...state,
        };
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
      // Store form data for current step
      if (!action.stepData) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        storedData: {
          ...state.storedData,
          [activeStepKey]: action.stepData,
        },
      };

    case WIZARD_ACTIONS.UPDATE_INVALID_STEPS:
      // Add/remove current step from invalidSteps array
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
    default:
      return state;
  }
};