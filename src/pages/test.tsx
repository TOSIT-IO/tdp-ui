import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { ProgressBar } from 'src/components/Deploy/ProgressBar'

const steps = [
  { name: 'Deploy Mode', component: Step1 },
  { name: 'Configuration', component: Step2 },
  { name: 'Review', component: Step3 },
]

const TestPage = () => {
  const [activeStepId, setActiveStepId] = useState(0)
  const stepsNames = steps.map((v) => v.name)
  const ActiveStepComponent = steps[activeStepId].component

  return (
    <div>
      <ActiveStepComponent />
      <button onClick={() => setActiveStepId(activeStepId - 1)}>Prev</button>
      <button onClick={() => setActiveStepId(activeStepId + 1)}>Next</button>
      <ProgressBar activeStepId={activeStepId} steps={stepsNames} />
    </div>
  )
}

TestPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default TestPage

function Step1() {
  return <p>Step 1</p>
}
function Step2() {
  return <p>Step 2</p>
}
function Step3() {
  return <p>Step 3</p>
}
