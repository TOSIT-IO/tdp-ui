import Link from 'next/link'
import { DeploymentsLogs } from '../Logs'
import { Button } from 'src/components/commons'

export const LogsSection = () => (
  <section>
    <header className="flex items-baseline justify-between">
      <h2 className="mb-5 text-2xl font-medium text-gray-900">
        Last deployments
      </h2>
      <Button as="Link" href="/deploy/new/" variant="filled">
        New deployment
      </Button>
    </header>
    <DeploymentsLogs limit={3} />
    <Link
      className="mt-2 block w-full text-center text-sm italic text-gray-500 underline"
      href="/deploy"
    >
      View all past deployments
    </Link>
  </section>
)
