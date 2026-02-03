export const traverseConfig = (
  config: Record<string, StepConfig>,
  entryPoint: string,
): string[] => {
  const result = [];
  let currentStep: string | null = entryPoint;

  while (currentStep) {
    result.push(currentStep);
    currentStep = config[currentStep].nextStep;
  }
  return result;
};