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
      return {
        ...state
      }
    }

      const nextStepsConfig = {
        ...state.stepsConfig,
        [activeStepKey]: {
          ...state.stepsConfig[activeStepKey],
          nextStep: action.nextStepId ?? null,
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
    // Update the nextStep for current step, recalculate navigationKeys
    // Hint: Use traverseConfig utility to rebuild navigation order

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
    return {
      ...state,
      storedData: {
        ...state.storedData,
        [activeStepKey]: action.stepData ?? ''
      }
    }

    case WIZARD_ACTIONS.UPDATE_INVALID_STEPS:
    // Add/remove current step from invalidSteps array

    default:
      return state;
  }
};