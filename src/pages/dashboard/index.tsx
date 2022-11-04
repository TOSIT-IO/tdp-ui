import type { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import type { NextPageWithLayout } from 'src/pages/_app'

const DashboardPage: NextPageWithLayout = () => {
  return <p>Page content</p>
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardPage
