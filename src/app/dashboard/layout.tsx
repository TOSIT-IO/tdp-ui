import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, Topbar } from 'src/components/Layout'
import { ToastProvider } from 'src/components/Layout/context'
import { Sidebar } from 'src/components/Layout/primitives'

export default function DashboardLayout({ children }) {
  const [logoInitialWidth, logoInitialHeight] = [126, 50]
  const logoRatio = 0.8

  return (
    <ToastProvider>
      <Sidebar sideWidth="13rem" space="0">
        {/* Sidebar */}
        <aside className="h-screen overflow-auto bg-gray-900 flex flex-col">
          <div className="mb-3 py-3 self-center">
            <p className="flex">
              <Image
                src="/TDP_LOGO_INVERSE_notext.png"
                alt="tdp-logo"
                width={logoInitialWidth * logoRatio}
                height={logoInitialHeight * logoRatio}
              />
              <span className="text-lg font-bold text-white">UI</span>
            </p>
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
