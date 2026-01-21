import ContentFlowSelector from "../components/ContentFlowSelector";
import ContentForm from "../components/ContentForm";

export const stepsConfig: Record<string, StepConfig> = {
  start: {
    title: 'Select Topic',
    content: <ContentFlowSelector key="start" />,
    options: [{ stepId: 'flowA' }, { stepId: 'flowB' }],
    nextStep: 'assetSelection',  // Default, can be changed dynamically
  },
  flowA: {
    title: 'Order',
    content: <ContentForm key="flowA" />,
    nextStep: 'assetSelection',
  },
  flowB: {
    title: 'Edit',
    content: <ContentForm key="flowB" />,
    nextStep: 'assetSelection',
  },
  assetSelection: {
    title: 'Select Asset',
    content: <ContentForm key="assetSelection" />,
    nextStep: 'submission',
  },
  submission: {
    title: 'Submit',
    content: <div>Submission Summary</div>,
    nextStep: null,  // Final step
  },
};