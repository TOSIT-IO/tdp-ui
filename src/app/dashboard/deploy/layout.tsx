import { PageTitle } from 'src/components/Layout/primitives/PageTitle'

export default function DeployLayout({ children }) {
  return (
    <div className="max-w-5xl mx-auto">
      <PageTitle>Deployment</PageTitle>
      {children}
    </div>
  )
}
