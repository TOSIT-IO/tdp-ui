import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { useDeploy } from 'src/hooks/useDeploy'

const DeployPage = () => {
  const [targets, setTargets] = useState([''])
  const { deploy } = useDeploy()

  function handleSubmit(event) {
    event.preventDefault()
    deploy(targets)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {targets.map((v, i) => {
          const name = `target-${i}`
          return (
            <div key={name}>
              <label htmlFor={name}></label>
              <input
                type="text"
                name={name}
                value={targets[i]}
                onChange={(e) =>
                  setTargets((prev) => {
                    const data = [...prev]
                    data[i] = e.target.value
                    return data
                  })
                }
              />
              <button
                type="button"
                onClick={() => setTargets((prev) => [...prev, ''])}
              >
                +
              </button>
            </div>
          )
        })}
        <button type="submit">Deploy</button>
      </form>
    </>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
