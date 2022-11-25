import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { Button } from 'src/components'
import { useDeploy } from 'src/hooks/useDeploy'

import InputField from 'src/app/deploy/InputField'
import { OperationsContextProvider } from 'src/app/deploy/OperationsContext'
import { PlusIcon } from '@heroicons/react/24/solid'
import { RadioInput, RadioList } from 'src/components/Radio'
import { OperationsList } from 'src/components/TextArea'

const deployMethods = [
  {
    title: 'All',
    description: 'Deploy all operations.',
    value: 'all',
  },
  {
    title: 'From sources',
    description: 'List of operations used as targets on the dag generation.',
    value: 'sources',
  },
  {
    title: 'To targets',
    description: 'List of operations used as sources on the dag generation.',
    value: 'targets',
  },
]

const DeployPage = () => {
  const [operations, setOperations] = useState<string[]>([])
  const { deploy } = useDeploy()
  const [deployMethodId, setDeployMethodId] = useState(0)

  return (
    <form className="flex flex-col gap-4">
      <header className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Deploy
        </h1>
      </header>

      {/* Radio */}
      <div className="sm:col-span-4 space-y-2">
        <RadioList
          label="Deploy mode"
          name="deploy-mode"
          options={deployMethods}
          selectedId={deployMethodId}
          setSelectedId={setDeployMethodId}
        />
      </div>

      {/* Source / Target*/}
      <div className="sm:col-span-6">
        <OperationsList
          label="Operation(s)"
          name={deployMethods[deployMethodId].value}
          isDisabled={deployMethods[deployMethodId].value === 'all'}
        />
      </div>

      {/* Filter */}
      <div className="sm:col-span-6">
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              name="operation"
              className="block w-full rounded-none rounded-l-md border border-gray-300 pl-2"
              placeholder="Filter"
            />
          </div>
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Restart*/}
      <div className="sm:col-span-6">
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Restart
          </label>
        </div>
      </div>

      {/* <OperationsContextProvider
            operations={operations}
            setOperations={setOperations}
          >
            <div className="flex flex-col justify-center h-full items-center gap-2">
              <div className="flex flex-col max-w-xs">
                <OperationsList />
                <InputField />
              </div>
              <Button onClick={() => deploy(operations)}>Deploy</Button>
            </div>
          </OperationsContextProvider> */}
    </form>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
