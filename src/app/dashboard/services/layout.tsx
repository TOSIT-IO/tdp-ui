import { PageTitle } from 'src/components/Layout/primitives/PageTitle'
import { ComponentsNav } from 'src/components/Services/ComponentsNav'

export default function ServiceLayout({ children }) {
  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsNav />
      {children}
    </>
  )
}
