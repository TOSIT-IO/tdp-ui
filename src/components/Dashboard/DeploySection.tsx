import { Button } from 'src/components/commons'

export const DeploySection = () => (
  <section>
    <h2 className="mb-5 text-2xl font-medium text-gray-900">New deployment</h2>
    <div className="text-center">
      <Button
        as="Link"
        href="/deploy/new/"
        variant="filled"
        className="mx-auto"
      >
        New deployment
      </Button>
    </div>
  </section>
)
