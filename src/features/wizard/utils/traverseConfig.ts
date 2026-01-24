export const traverseConfig = (config: Record<string, StepConfig>, entryPoint: string): string[] => {
  // Start at entryPoint, follow nextStep until null
  // Return array of step keys in order
  const result = [];
  let currentStep: string | null = entryPoint;
  console.log('currentStep', currentStep);
  
  while (currentStep) {
    result.push(currentStep)    
    currentStep = config[currentStep].nextStep ;
  }
   console.log('====================================');
   console.log('result', result);
   console.log('====================================');
  return result

};