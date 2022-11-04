import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar className="basis-60 flex-grow" />
      <main className="basis-0 grow-[999] overflow-auto">{children}</main>
    </div>
  )
}
