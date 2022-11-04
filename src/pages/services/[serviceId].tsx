import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { useServiceInfos } from 'src/hooks'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId } = router.query
  const serviceInfos = useServiceInfos(
    Array.isArray(serviceId) ? serviceId[0] : serviceId
  )

  return (
    <div className="p-5">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-3xl font-medium leading-6 text-gray-900">
          {serviceInfos?.id}
        </h3>
      </div>
      <table className="min-w-full divide-y divide-gray-300 mt-5">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Prop
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {serviceInfos?.variables &&
            Object.entries(serviceInfos.variables).map(([k, v], i) => (
              <tr key={k}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {k}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {typeof v === 'object' ? (
                    <pre>{JSON.stringify(v, null, 2)}</pre>
                  ) : (
                    v
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ServicePage
