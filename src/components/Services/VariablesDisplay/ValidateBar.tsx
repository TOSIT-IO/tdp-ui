import { useState } from 'react'
import { Button } from 'src/components/commons'
import { usePutServiceConfig } from 'src/hooks'

export function ValidateBar() {
  const { sendVariables } = usePutServiceConfig()
  const [validateMessage, setValidateMessage] = useState('')

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendVariables(validateMessage)
    setValidateMessage('')
  }

  return (
    <div className="sticky bottom-0 w-full py-4 bg-white flex items-center justify-end">
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
