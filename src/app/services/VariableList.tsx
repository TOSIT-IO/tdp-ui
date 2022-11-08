type TableauType = {
  variables: any[][]
}

export default function VariableList({ variables }: TableauType) {
  return (
    <div className="flex flex-col gap-2">
      {variables.map(([k, v], i) => (
        <div className="flex text-slate-600" key={k}>
          <label htmlFor={k} className="font-bold mr-2">
            {k}:
          </label>
          <input
            type="text"
            name={k}
            className="w-full"
            defaultValue={JSON.stringify(v)}
          />
        </div>
      ))}
    </div>
  )
}
