// import React from 'react'
// import './index.css'
// import App from './App.jsx'
// import ReactDom from "react-dom/client"
// //import "bootstrap/dist/css/bootstrap.min.c .css";
// import { BrowserRouter } from 'react-router-dom'
// import ShopContextProvider from './context/ShopContext.jsx'
// ReactDom.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <ShopContextProvider>
//      <App />
//   </ShopContextProvider>
//      </BrowserRouter>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
)
