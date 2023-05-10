import {
  DeploySection,
  LogsSection,
  ServicesSection,
} from 'src/components/Dashboard'

const DashboardPage = () => {
  return (
    <div className="mt-10 space-y-10">
      <LogsSection />
      <DeploySection />
      <ServicesSection />
    </div>
  )
}

export default DashboardPage
