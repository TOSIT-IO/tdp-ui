import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'
import {
  Menu,
  ToastProvider,
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
          <Image
            className="my-5 mr-3 self-center"
            src="/tdp-logo.svg"
            alt="TDP logo"
            width={110}
            height={63}
          />
          <Menu />
          <div className="mb-3 mt-auto px-2">
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
