import Sidebar from './Sidebar'
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
      <div className="flex h-screen">
        <Sidebar className="basis-60 flex-grow" />
        <main className="basis-0 grow-[999] overflow-auto">{children}</main>
      </div>
    </>
  )
}
