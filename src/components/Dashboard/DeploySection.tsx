import { Button } from 'src/components/commons'

export const DeploySection = () => {
  return (
    <section>
      <h3 className="mb-5 text-2xl font-bold">New deployment</h3>
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
}
