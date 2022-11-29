import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { classNames } from 'src/utils'

interface CardProps {
  option: {
    value: string
    title: string
    description: string
  }
  radioName: string
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

export function Card({
  option,
  radioName,
  selectedOption,
  setSelectedOption,
}: CardProps): JSX.Element {
  const { title, description, value } = option
  return (
    <li
      onClick={() => setSelectedOption(value)}
      className={classNames(
        'cursor-pointer text-gray-500 border border-gray-200 rounded-lg p-5',
        option.value === selectedOption
          ? 'border-blue-600 text-blue-600'
          : 'hover:text-gray-600 hover:bg-gray-100'
      )}
    >
      <input
        type="radio"
        id={value}
        value={value}
        name={radioName}
        className="hidden"
        required
      />
      <label htmlFor={value} className="cursor-pointer">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{title}</div>
          {option.value === selectedOption && (
            <CheckCircleIcon className="ml-3 w-6 h-6" aria-hidden="true" />
          )}
        </div>
        <p>{description}</p>
      </label>
    </li>
  )
}
