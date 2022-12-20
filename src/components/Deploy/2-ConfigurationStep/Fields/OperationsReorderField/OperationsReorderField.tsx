import { FieldHeader } from 'src/components/Deploy/FieldHeader'
import { ScrollContextProvider } from './context'
import { OperationReorder } from './OperationReorder'
import { OperationSelection } from './OperationSelection'

export function OperationsReorderField() {
  return (
    <ScrollContextProvider>
      <div>
        <FieldHeader title="Operations" />
        <div className="flex gap-2">
          <OperationSelection className="flex-[50%]" />
          <OperationReorder className="flex-[50%]" />
        </div>
      </div>
    </ScrollContextProvider>
  )
}
