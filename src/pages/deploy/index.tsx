import { ReactElement, useRef, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { Button } from 'src/components'
import { useDeploy } from 'src/hooks/useDeploy'

const DeployPage = () => {
  const [targets, setTargets] = useState([])
  const [input, setInput] = useState('')
  const { deploy } = useDeploy()

  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    deploy(targets)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-screen justify-center p-5 gap-2"
    >
      <div className="flex gap-1 flex-wrap">
        {targets.map((v, i) => (
          <button
            key={v}
            type="button"
            className="bg-slate-100 rounded-md p-1 border-slate-200 border-[1px]"
            onClick={(e) => {
              setInput(targets.splice(i, 1)[0])
              inputRef.current.focus()
            }}
          >
            {v}
          </button>
        ))}
        <input
          type="text"
          ref={inputRef}
          value={input}
          style={{ width: `${input.length}ch` }}
          className="px-2 rounded-md border-slate-200 border-[1px] grow"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            const trimmedInput = input.trim()
            if (
              [',', 'Enter'].includes(e.key) &&
              trimmedInput.length &&
              !targets.includes(trimmedInput)
            ) {
              e.preventDefault()
              setTargets((prev) => [...prev, trimmedInput])
              setInput('')
            }
            if (e.key === 'Backspace' && !input.length && targets.length) {
              e.preventDefault()
              setInput(targets.pop())
            }
          }}
        />
      </div>
      <Button type="submit">Deploy</Button>
    </form>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
