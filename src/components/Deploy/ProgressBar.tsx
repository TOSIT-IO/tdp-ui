import { classNames } from 'src/utils'

export function ProgressBar({
  activeStepId,
  steps,
}: {
  activeStepId: number
  steps: string[]
}) {
  const isActiveStep = (stepId: number) => stepId === activeStepId
  const getProgressBarWidth = (currentStep: number, StepsNb: number) => {
    const stepSize = 100 / StepsNb
    const offset = stepSize / 2
    return currentStep * stepSize + offset + '%'
  }

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width: getProgressBarWidth(activeStepId, steps.length) }}
        />
      </div>
      <div className={`mt-6 flex text-sm font-medium text-gray-600`}>
        {steps.map((step, stepId) => (
          <div
            key={step}
            className={classNames(
              'flex-1 text-center',
              isActiveStep(stepId) && 'text-indigo-600'
            )}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
