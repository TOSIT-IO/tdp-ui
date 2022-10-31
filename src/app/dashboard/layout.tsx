import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar className="basis-60 flex-grow h-screen" />
      <main className="basis-0 grow-[999]">{children}</main>
    </div>
  )
}
