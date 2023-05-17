import Link from 'next/link'

import {
  Service,
  useGetServicesApiV1ServiceGetQuery,
} from 'src/store/api/tdpApi'

// TODO server must return a status
const ServiceStatus = ({
  status,
}: {
  status: 'TODO' | 'success' | 'failed' | 'planed'
}) => {
  switch (status) {
    case 'success':
      return (
        <span className="mr-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
          Success
        </span>
      )
    case 'planed':
      return (
        <span className="mr-2 inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
          <span className="mr-1 h-2 w-2 rounded-full bg-orange-500"></span>
          Pending
        </span>
      )
    case 'failed':
      return (
        <span className="mr-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
          Failed
        </span>
      )
    default:
      return (
        <span className="mr-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
          Unknwon
        </span>
      )
  }
}

const ServiceCard = ({ service }: { service: Service }) => (
  <Link href={`/services/${service.id}`}>
    <li className="rounded-lg border border-gray-200 px-4 py-2 shadow hover:bg-gray-100">
      <h5 className="text-lg font-bold text-gray-700">{service.id}</h5>
      {/* <ServiceStatus status={'TODO'} /> */}
    </li>
  </Link>
)

export const ServicesSection = () => {
  const { data } = useGetServicesApiV1ServiceGetQuery()

  return (
    <section>
      <h2 className="mb-5 text-2xl font-medium text-gray-900">
        Running services
      </h2>
      <ul className="mx-8 grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ul>
    </section>
  )
}
