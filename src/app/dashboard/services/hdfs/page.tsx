'use client'

import { useHdfsVariables } from 'src/hooks/useHdfsVariables'

export default function HdfsPage() {
  //const { hdfsVariables } = useTdpClient()
  const hdfsVariables = useHdfsVariables()

  return (
    <pre className="overflow-y-auto h-3/6">
      {JSON.stringify(hdfsVariables, null, 2)}
    </pre>
  )
}
