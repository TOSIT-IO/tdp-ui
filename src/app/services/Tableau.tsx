type TableauType = {
  variables: any[][]
}

export default function Tableau({ variables }: TableauType) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
          >
            Prop
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
          >
            Value
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {variables &&
          variables.map(([k, v], i) => (
            <tr key={k}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {k}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {JSON.stringify(v)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
