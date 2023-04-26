import { UseFormRegister } from 'react-hook-form'

import { Button } from 'src/components/commons'
import { FormValues } from './types'
import { useAppSelector } from 'src/store'

const ValidateBar = ({
  register,
}: {
  register: UseFormRegister<FormValues>
}) => {
  const userInput = useAppSelector((state) => state.userInput)
  const isDisabled = !userInput.variables && userInput.components.length === 0
  return (
    <div className="sticky bottom-0 flex w-full items-center justify-end bg-white py-4">
      <input {...register('message')} placeholder="Commit message" />
      <Button disabled={isDisabled} type="submit">
        Validate
      </Button>
    </div>
  )
}

export default ValidateBar
