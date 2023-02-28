import 'react-toastify/dist/ReactToastify.css'
import {
  Menu,
  ToastProvider,
  TdpUiLogo,
  UserInfos,
  Sidebar,
  LegalNotice,
} from 'src/components/Layout'

export function DashboardLayout({ children }) {
  return (
    <ToastProvider>
      <Sidebar sideWidth="13rem" space="0">
        {/* Sidebar */}
        <aside className="flex h-screen flex-col overflow-auto bg-gray-900">
          <div className="mb-3 self-center py-3">
            <TdpUiLogo width={100} height={40} />
          </div>
          <Menu />
          <div className="mt-auto mb-3 p-2">
            <UserInfos />
          </div>
        </aside>
        {/* Main content */}
        <div className="h-screen overflow-y-auto">
          <main className="mx-auto max-w-5xl p-5">{children}</main>
          <div className="mt-auto">
            <LegalNotice />
          </div>
        </div>
      </Sidebar>
    </ToastProvider>
  )
}
