import { UseFormRegister } from 'react-hook-form'

import { Button } from 'src/components/commons'
import { FormValues } from './types'

const ValidateBar = ({
  register,
}: {
  register: UseFormRegister<FormValues>
}) => {
  return (
    <div className="sticky bottom-0 flex w-full items-center justify-end bg-white py-4">
      <input {...register('message')} placeholder="Commit message" />
      <Button type="submit">Validate</Button>
    </div>
  )
}

export default ValidateBar
