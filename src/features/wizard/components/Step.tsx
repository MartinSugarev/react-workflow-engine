import useWizardActiveStep from "./hooks/useWizardActiveStep";

export default function Step() {
  const { activeStepConfig } = useWizardActiveStep();
  console.log('====================================');
  console.log('activeStepConfig', activeStepConfig);
  console.log('====================================');
  return (
    <div className="rounded-xl border border-black bg-sky-200 p-10 min-h-[360px]">
      <div className="text-xl font-medium mb-6">{activeStepConfig.title}</div>
      {activeStepConfig.content}
    </div>
  );
}
