import { StepConfigPersisted, WizardLocalStorageDataType } from "../WizardProvider";

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function areValuesString(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    !Array.isArray(value) &&
    value !== null &&
    Object.entries(value).every(([k, v]) => typeof v === "string")
  );
}


function isStepsConfig(
  value: unknown,
): value is Record<string, StepConfigPersisted> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.entries(value).every(
      ([k, v]) =>
        typeof v === "object" &&
        v !== null &&
        !Array.isArray(v) &&
        "title" in v &&
        typeof v.title === "string" &&
        "nextStep" in v &&
        (typeof v.nextStep === "string" || v.nextStep === null) &&
        (typeof v.options === "undefined" ||
          (Array.isArray(v.options) &&
            v.options.every(
              (o: any) =>
                typeof o === "object" &&
                o !== null &&
                "stepId" in o &&
                typeof o.stepId === "string",
            ))),
    )
  );
}

export function isWizardLocalStorageDataType(
  data: unknown,
): data is WizardLocalStorageDataType {
  return (
    typeof data === "object" &&
    data !== null &&
    "activeStepIndex" in data &&
    typeof data.activeStepIndex === "number" &&
    "invalidSteps" in data &&
    isStringArray(data.invalidSteps) &&
    "storedData" in data &&
    areValuesString(data.storedData) &&
    "stepsConfig" in data &&
    isStepsConfig(data.stepsConfig)
  );
}

export function JSONparse<T>(params: string): T | undefined {
  try {
    return JSON.parse(params);
  } catch {
    console.log(`Error in parsing JSON string`);
    return undefined;
  }
}
