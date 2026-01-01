



// import React, { useEffect, useState } from 'react'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// import { Routes, Route } from 'react-router-dom'
// import Add from './pages/Add'
// import List from './pages/List'
// import Orders from './pages/Orders'
// import Login from './components/Login'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// //import 'bootstrap/dist/css/bootstrap.min.css'

// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const currency = '$'

// const App = () => {

//   const [token, setToken] = useState(
//     localStorage.getItem('token') ? localStorage.getItem('token') : ''
//   )

//   useEffect(() => {
//     localStorage.setItem('token', token)
//   }, [token])

//   return (
//     <div className="bg-light min-vh-100">
//       <ToastContainer />

//       {token === ""
//         ? <Login setToken={setToken} />
//         : <>
//           <Navbar setToken={setToken} />
//           <hr />

//           <div className="d-flex w-100">
//             <Sidebar />

//             <div className="container my-4 text-secondary">
//               <Routes>
//                 <Route path="/add" element={<Add token={token} />} />
//                 <Route path="/list" element={<List token={token} />} />
//                 <Route path="/orders" element={<Orders token={token} />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       }
//     </div>
//   )
// }

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
