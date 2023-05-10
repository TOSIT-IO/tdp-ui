import Link from 'next/link'
import { DeploymentsLogs } from '../Logs'

export const LogsSection = () => {
  return (
    <section>
      <h3 className="mb-5 text-2xl font-bold">Last deployments</h3>
      <DeploymentsLogs limit={3} />
      <Link
        className="mt-2 block w-full text-center text-sm italic text-gray-500 underline"
        href="/deploy"
      >
        View all past deployments
      </Link>
    </section>
  )
}
