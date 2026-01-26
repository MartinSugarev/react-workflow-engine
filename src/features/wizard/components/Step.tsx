import useWizardActiveStep from "./hooks/useWizardActiveStep";

export default function Step() {
  const { activeStepConfig, activeStepStoredData } = useWizardActiveStep();
  return (
    <div className="rounded-xl border border-black bg-sky-200 p-10 min-h-[360px] flex flex-col gap-10">
      <div>
        <div className="text-xl font-medium mb-6">{activeStepConfig.title}</div>
        {activeStepConfig.content}
      </div>
      {activeStepStoredData}
    </div>
  );
}