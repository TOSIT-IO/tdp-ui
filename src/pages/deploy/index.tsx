import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import {
  Button,
  FilterField,
  DeployTypeField,
  RestartField,
  OperationsField,
} from 'src/components'
import { useDeploy } from 'src/hooks/useDeploy'
import { DeployRequest, FilterTypeEnum } from '@/client-sdk'

const deployMethods = {
  all: {
    title: 'All',
    description: 'Deploy all operations.',
  },
  sources: {
    title: 'From sources',
    description: 'List of operations used as targets on the dag generation.',
  },
  targets: {
    title: 'To targets',
    description: 'List of operations used as sources on the dag generation.',
  },
}

type TfilterTypes = {
  [value in FilterTypeEnum]: {
    placeholder: string
  }
}

const filterTypes: TfilterTypes = {
  regex: { placeholder: `.+config` },
  glob: { placeholder: `*_config` },
}

const DeployPage = () => {
  const { deploy } = useDeploy()
  const [operations, setOperations] = useState<string[]>([])
  const [deployMethod, setDeployMethod] = useState(
    Object.keys(deployMethods)[0]
  )
  const [filterType, setFilterType] = useState(FilterTypeEnum.Glob)
  const [filter, setFilter] = useState('')
  const [restart, setRestart] = useState(true)

  function handleDeploy(e: React.SyntheticEvent) {
    e.preventDefault()
    const deployReq: DeployRequest = { restart }
    if (filter.trim()) {
      deployReq.filter_type = filterType
      deployReq.filter_expression = filter
    }
    if (deployMethod !== 'all') {
      deployReq[deployMethod] = operations
    }
    deploy(deployReq)
  }

  return (
    <form className="flex flex-col gap-7">
      <header className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Deploy
        </h1>
      </header>
      <DeployTypeField
        options={deployMethods}
        selectedOption={deployMethod}
        setSelectedOption={setDeployMethod}
      />
      <div className="-mt-4">
        <OperationsField
          isFieldDisabled={deployMethod === 'all'}
          operations={operations}
          setOperations={setOperations}
        />
      </div>
      <FilterField
        filterTypes={filterTypes}
        filter={filter}
        setFilter={setFilter}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <RestartField restart={restart} setRestart={setRestart} />
      <div className="self-center">
        <Button type="button" onClick={handleDeploy}>
          Deploy
        </Button>
      </div>
    </form>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
