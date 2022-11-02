import type { ReactElement } from 'react'
import DashboardLayout from '../app/dashboard/layout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <p>Page content</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Page
