import DashboardLayout from 'src/app/dashboard/layout'

const DashboardPage = () => {
  return (
    <>
      <p>Page content</p>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardPage
