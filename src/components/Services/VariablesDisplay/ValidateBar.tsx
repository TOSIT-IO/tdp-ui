import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'src/components/commons'
import { usePutServiceConfig } from 'src/hooks'

export function ValidateBar() {
  const { sendVariables } = usePutServiceConfig()
  const [validateMessage, setValidateMessage] = useState('')

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendVariables(validateMessage)
    setValidateMessage('')
    toast.info('Validating configuration...')
  }

  return (
    <div className="sticky bottom-0 flex w-full items-center justify-end bg-white py-4">
      <input
        value={validateMessage}
        onChange={(e) => setValidateMessage(e.target.value)}
        placeholder="Commit message"
      />
      <Button type="button" onClick={handleSubmit}>
        Validate
      </Button>
    </div>
  )
}
