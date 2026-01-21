import { WIZARD_ACTIONS } from "../actions";

export const wizardReducer = (state: WizardState, action: WizardAction): WizardState => {
  const activeStepKey = state.navigationKeys[state.activeStepIndex];

  switch (action.type) {
    case WIZARD_ACTIONS.UPDATE_STEPS_CONFIG:
      // Update the nextStep for current step, recalculate navigationKeys
      // Hint: Use traverseConfig utility to rebuild navigation order

    case WIZARD_ACTIONS.UPDATE_ACTIVE_STEP_INDEX:
      // Update activeStepIndex

    case WIZARD_ACTIONS.UPDATE_STORED_DATA:
      // Store form data for current step

    case WIZARD_ACTIONS.UPDATE_INVALID_STEPS:
      // Add/remove current step from invalidSteps array

    default:
      return state;
  }
};