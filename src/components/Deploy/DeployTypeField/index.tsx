import { FieldHeader } from 'src/components'
import { Card } from './Card'

interface DeployTypeFieldProps {
  options: {
    [value: string]: {
      title: string
      description: string
    }
  }
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

export function DeployTypeField({
  options,
  selectedOption,
  setSelectedOption,
}: DeployTypeFieldProps): JSX.Element {
  return (
    <fieldset>
      <FieldHeader as="legend" title="Deploy type" />
      <ul className="grid gap-6 w-full md:grid-cols-3 auto-rows-max">
        {Object.entries(options).map(([k, v], index) => (
          <Card
            key={k}
            option={{ ...v, value: k }}
            radioName="deploy-type"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ))}
      </ul>
    </fieldset>
  )
}
