import { LogsSection, ServicesSection } from 'src/components/Dashboard'

const DashboardPage = () => (
  <div className="mt-10 space-y-10">
    <h1 className="mb-5 text-3xl font-medium text-gray-900">Dashboard</h1>
    <LogsSection />
    <ServicesSection />
  </div>
)

export default DashboardPage
