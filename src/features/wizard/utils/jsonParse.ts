import { StepsConfigPersisted, WizardLocalStorageDataType } from "../WizardProvider";


function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === "string")
  );
}

function areValuesString(value: unknown): value is Record<string, string> {
  return (
    typeof value === 'object' && !Array.isArray(value) && value !== null &&
    Object.entries(value).every(([k , v]) => typeof v === 'string')
  );
}


export function isWizardLocalStorageDataType(
  data: unknown
): data is WizardLocalStorageDataType {
  return (
    typeof data === "object" &&
    data !== null &&
    "activeStepIndex" in data &&
    typeof data.activeStepIndex === "number" &&
    "invalidSteps" in data &&
    isStringArray(data.invalidSteps) &&
    "storedData" in data && areValuesString(data.storedData) &&
    "stepsConfig" in data &&
    typeof data.stepsConfig === "object"
  );
}

export function JSONparse<T>(params: string): T | undefined {
    try {
        return  JSON.parse(params)
    } catch {
        console.log(`Error in parsing JSON string`);
        return undefined
    }
}