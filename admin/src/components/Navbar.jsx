
import React from 'react'

const Navbar = ({ setShowSidebar, setToken }) => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3">
      <div className="d-flex align-items-center gap-2">
        {/* Mobile menu */}
        <button
          className="btn btn-outline-dark d-md-none"
          onClick={() => setShowSidebar(true)}
        >
          ☰
        </button>
        {/* Brand (left) */}
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold" style={{ letterSpacing: '2px', fontSize: '28px' }}>
              CARTNEXT<span className="text-primary">.</span>
            </span>
            <small className="text-muted" style={{ letterSpacing: '2px' }}>
              ADMIN PANEL             </small>
          </div>       
           </div>


      </div>



      {/* RIGHT: Logout */}
      <button
        className="btn btn-dark"
        onClick={() => {
          localStorage.removeItem("token");
          setToken("");
        }}
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
