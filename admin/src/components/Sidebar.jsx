
// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Sidebar = ({ showSidebar, setShowSidebar }) => {

//   const links = (
//     <>
//       <NavLink to="/add" className="list-group-item list-group-item-action">
//         ➕ Add Items
//       </NavLink>
//       <NavLink to="/list" className="list-group-item list-group-item-action">
//         📋 List Items
//       </NavLink>
//       <NavLink to="/orders" className="list-group-item list-group-item-action">
//         📦 Orders
//       </NavLink>
//     </>
//   )

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="d-none d-md-block border-end" style={{ width: 220 }}>
//         <div className="list-group list-group-flush">
//           {links}
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {showSidebar && (
//         <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
//           <div className="bg-white h-100 p-3" style={{ width: 240 }}>
//             <button
//               className="btn btn-sm btn-danger mb-3"
//               onClick={() => setShowSidebar(false)}
//             >
//               Close
//             </button>
//             <div
//               className="list-group list-group-flush"
//               onClick={() => setShowSidebar(false)}
//             >
//               {links}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Sidebar
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ showSidebar, setShowSidebar }) => {

  const links = (
    <>
      <NavLink to="/add" className="list-group-item list-group-item-action">
        ➕ Add Items
      </NavLink>
      <NavLink to="/list" className="list-group-item list-group-item-action">
        📋 List Items
      </NavLink>
      <NavLink to="/orders" className="list-group-item list-group-item-action">
        📦 Orders
      </NavLink>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar (FULL HEIGHT) */}
      <div
        className="d-none d-md-block border-end vh-100"
        style={{ width: 220 }}
      >
        <div className="list-group list-group-flush h-100">
          {links}
        </div>
      </div>

      {/* Mobile Sidebar (FULL HEIGHT) */}
      {showSidebar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
          <div
            className="bg-white h-100 p-3"
            style={{ width: 240 }}
          >
            <button
              className="btn btn-sm btn-danger mb-3"
              onClick={() => setShowSidebar(false)}
            >
              Close
            </button>

            <div
              className="list-group list-group-flush h-100"
              onClick={() => setShowSidebar(false)}
            >
              {links}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
