import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex m-1 space-x-1 h-screen">
      <Sidebar className="basis-60 flex-grow h-screen" />
      {/* <main className="basis-0 grow h-3/4 w-3/4">{children}</main> */}
      {/* <main className="basis-0 flex-grow max-h-screen width:70vh">{children}</main> */}
      <main className="basis-0 flex-grow max-h-screen  w-3/4">{children}</main>
    </div>
  )
}
