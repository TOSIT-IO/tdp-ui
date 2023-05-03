import { ToastContainer } from 'react-toastify'

export const ToastProvider = ({ children }) => (
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
    {children}
  </>
)
