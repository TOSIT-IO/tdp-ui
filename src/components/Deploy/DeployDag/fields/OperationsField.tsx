import { KeyboardEventHandler, useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { FieldHeader } from 'src/components/commons'
import { DeployModeEnum } from '../context'
import { useOperations, useSelectedDeployMode } from '../hooks'

const fieldDescriptions = {
  [DeployModeEnum.ALL]: 'All operations will be deployed.',
  [DeployModeEnum.SOURCES]:
    'Sources operations from which the DAG will be deployed.',
  [DeployModeEnum.TARGETS]:
    'Targets operations to which the DAG will be deployed.',
}

type OperationOption = {
  readonly label: string
  readonly value: string
}

const createOption = (label: string) => ({
  label,
  value: label,
})

export const OperationsField = () => {
  const [_, setOperations] = useOperations()
  const [selectedDeployMode] = useSelectedDeployMode()
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<readonly OperationOption[]>([])

  useEffect(() => {
    setOperations(value.map((option) => option.value))
  }, [value, setOperations])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case ' ':
      case ',':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)])
        setInputValue('')
        event.preventDefault()
    }
  }

  return (
    <fieldset>
      <FieldHeader
        title="Operations"
        description={fieldDescriptions[selectedDeployMode]}
      />
      <CreatableSelect
        components={{
          DropdownIndicator: null,
        }}
        inputValue={inputValue}
        isDisabled={selectedDeployMode === DeployModeEnum.ALL}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="operation_name"
        value={value}
        classNames={{
          control: () => '!border-gray-300 font-mono !rounded-md',
          placeholder: () => '!text-gray-400',
        }}
      />
    </fieldset>
  )
}
