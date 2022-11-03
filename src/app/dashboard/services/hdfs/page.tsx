'use client'

import { useHdfsVariables } from 'src/hooks/useHdfsVariables'

export default function HdfsPage() {
  //const { hdfsVariables } = useTdpClient()
  const hdfsVariables = useHdfsVariables()

  return (
    //    <div className="box-border h-full w-screen p-4 border-4">
    // <div className="box-border p-4 border-4 basis-60 flex-grow h-screen w-auto">
    <div className="box-border m-auto p-4 border-4 basis-60 flex-grow-0 h-screen w-auto">
      {/* <pre className="overflow-auto flex-grow h-screen w-auto"> */}
      <pre className="overflow-auto flex-grow h-screen w-auto">
        {JSON.stringify(hdfsVariables, null, 2)}
      </pre>
    </div>
  )
}
