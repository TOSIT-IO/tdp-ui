import 'react-toastify/dist/ReactToastify.css'
import {
  Menu,
  Topbar,
  ToastProvider,
  TdpUiLogo,
  Sidebar,
} from 'src/components/Layout'

export default function DashboardLayout({ children }) {
  return (
    <ToastProvider>
      <Sidebar sideWidth="13rem" space="0">
        {/* Sidebar */}
        <aside className="h-screen overflow-auto bg-gray-900 flex flex-col">
          <div className="mb-3 py-3 self-center">
            <TdpUiLogo width={100} height={40} />
          </div>
          <Menu />
        </aside>
        {/* Main content */}
        <div className="h-screen overflow-y-auto">
          <Topbar className="bg-gray-900 sticky top-0" />
          <main className="p-5">{children}</main>
        </div>
      </Sidebar>
    </ToastProvider>
  )
}
