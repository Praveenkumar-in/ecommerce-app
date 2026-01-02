
// export default App
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
//import 'bootstrap/dist/css/bootstrap.min.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log("urlapp",backendUrl)
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  if (!token) return <Login setToken={setToken} />

  return (
    <>
      <ToastContainer />
      <Navbar setShowSidebar={setShowSidebar} setToken={setToken} />

      <div className="d-flex">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div className="container-fluid p-3">
          <Routes>
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    

    </>
  )
}

export default App
