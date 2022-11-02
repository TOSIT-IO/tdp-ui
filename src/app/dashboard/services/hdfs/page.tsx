'use client'

import { useHdfsVariables } from 'src/hooks/useHdfsVariables'

export default function HdfsPage() {
  //const { hdfsVariables } = useTdpClient()
  const hdfsVariables = useHdfsVariables()

  return (
    <pre className="overflow-y-auto">
      {JSON.stringify(hdfsVariables, null, 2)}
    </pre>
  )
}
