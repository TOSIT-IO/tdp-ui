import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DashboardLayout({ children }) {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Topbar className="flex" />
      <div className="flex h-screen">
        <Sidebar className="basis-60 flex-grow" />
        <main className="basis-0 grow-[999] overflow-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl py-10">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}
