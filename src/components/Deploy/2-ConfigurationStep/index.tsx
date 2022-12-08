import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import { TfilterType } from 'src/types/deployTypes'
import { FilterField } from './FilterField'
import { OperationsField } from './OperationsField'
import { RestartField } from './RestartFlied'

const filterTypes: TfilterType[] = [
  { name: 'regex', placeholder: `.+config` },
  { name: 'glob', placeholder: `*_config` },
]

export function ConfigurationStep() {
  return (
    <form className="flex flex-col gap-7">
      <header className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Deploy
        </h1>
      </header>
      <div className="-mt-4">
        <OperationsField />
      </div>
      <FilterField filterTypes={filterTypes} />
      <RestartField />
    </form>
  )
}
