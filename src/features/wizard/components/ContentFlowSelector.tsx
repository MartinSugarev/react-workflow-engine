import { useContext } from "react";
import { WizardNavigationContext } from "../WizardProvider";


export default function ContentFlowSelector() {
  const data = useContext(WizardNavigationContext)
  if(!data) return

  const {activeStepIndex, stepsConfig, entryPoint} = data
  const activeStepConfig = stepsConfig[entryPoint]
  return (
    <>
      <div className="text-xl font-medium mb-6">Select Topic</div>
         <div className="flex items-center gap-6 text-base">
        {activeStepConfig.options?.map((o, inx) => {
          return (
        <label key={o.stepId} className="inline-flex items-center gap-2">
          <input type="radio" name={o.stepId} defaultChecked={inx === activeStepIndex} />
          <span>{o.stepId}</span>
        </label>
          )
        })}
      </div>
    </>
  );
}
