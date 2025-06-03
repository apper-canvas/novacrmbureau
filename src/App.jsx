import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="relative overflow-hidden rounded-xl shadow-elevated backdrop-blur-sm bg-white/90 border border-white/20"
        progressClassName="bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  )
}

export default App