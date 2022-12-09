import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { DeployContextProvider } from 'src/contexts'
import { ProgressBar } from 'src/components/Deploy/ProgressBar'
import { ConfigurationStep, DeployModeStep, ReviewStep } from 'src/components'

const steps = [
  { name: 'Deploy Mode', component: DeployModeStep },
  { name: 'Configuration', component: ConfigurationStep },
  { name: 'Review', component: ReviewStep },
]

const DeployPage = () => {
  const [activeStepId, setActiveStepId] = useState(0)
  const stepsNames = steps.map((v) => v.name)
  const ActiveStepComponent = steps[activeStepId].component

  function toggleNextStep() {
    if (activeStepId >= steps.length - 1) return
    setActiveStepId((prev) => prev + 1)
  }

  function togglePreviousStep() {
    if (activeStepId <= 0) return
    setActiveStepId((prev) => prev - 1)
  }

  return (
    <>
      <DeployContextProvider>
        <ActiveStepComponent
          toggleNextStep={toggleNextStep}
          togglePreviousStep={togglePreviousStep}
        />
      </DeployContextProvider>
      <div className="mt-24">
        <ProgressBar activeStepId={activeStepId} steps={stepsNames} />
      </div>
    </>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
