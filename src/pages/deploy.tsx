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
  return (
    <>
      <DeployContextProvider>
        <ActiveStepComponent />
      </DeployContextProvider>
      <ProgressBar activeStepId={activeStepId} steps={stepsNames} />
      <div className="flex justify-end gap-6 mt-3">
        <button onClick={() => setActiveStepId(activeStepId - 1)}>Prev</button>
        <button onClick={() => setActiveStepId(activeStepId + 1)}>Next</button>
      </div>
    </>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
