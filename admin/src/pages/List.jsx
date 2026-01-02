// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// //import 'bootstrap-icons/font/bootstrap-icons.css'

// const List = ({ token }) => {

//   const [list, setList] = useState([])

//  const fetchList = async () => {
//   try {
//     const response = await axios.get(
//       backendUrl + '/api/product/list',
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     )

//     if (response.data.success && Array.isArray(response.data.data)) {
//       setList([...response.data.data].reverse())
//     } else {
//       setList([])
//       toast.error("No products found")
//     }

//   } catch (error) {
//     toast.error(error.message)
//   }
// }
//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/product/remove',
//         { id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       )

//       if (response.data.success) {
//         toast.success(response.data.message)
//         fetchList()
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   return (
//     <>
//       <p className="mb-2">All Products List</p>

//       <div className="d-flex flex-column gap-2">

//         {/* Header */}
//         <div
//           className="d-none d-md-grid border bg-light p-2"
//           style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }}
//         >
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="text-center">Action</b>
//         </div>

//         {/* Rows */}
//         {list.map((item) => (
//           <div
//             key={item._id}
//             className="d-grid border p-2 align-items-center"
//             style={{ gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr' }}
//           >
//             <img src={item.image[0]} alt="" style={{ width: 50 }} />
//             <p className="mb-0">{item.name}</p>
//             <p className="mb-0">{item.category}</p>
//             <p className="mb-0">{currency}{item.price}</p>
//             <i
//               className="bi bi-trash text-danger text-center"
//               style={{ cursor: 'pointer', fontSize: '1.2rem' }}
//               onClick={() => removeProduct(item._id)}
//             ></i>
//           </div>
//         ))}

//       </div>
//     </>
//   )
// }

// export default List
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

// og  const fetchList = async () => {
//     try {
//       const res = await axios.get(
//         backendUrl + '/api/product/list',
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       setList([...res.data.data].reverse())
//     } catch (err) {
//       toast.error(err.message)
//     }
//   }
const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list',
          { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    await axios.post(
      backendUrl + '/api/product/remove',
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    fetchList()
  }

  useEffect(() => { fetchList() }, [])

  return (
    <>
      <h5>All Listed Products</h5>

      {/* MOBILE VIEW */}
      <div className="d-md-none">
        {list.map(item => (
          <div className="card mb-2" key={item._id}>
            <div className="card-body d-flex gap-2">
              <img src={item.image[0]} width="60" />
              <div>
                <h6>{item.name}</h6>
                <p className="mb-1">{item.category}</p>
                <p className="mb-1">{currency}{item.price}</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeProduct(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      {/* DESKTOP VIEW */}
      <div className="d-none d-md-block">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item._id}>
                <td><img src={item.image[0]} width="50" /></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{currency}{item.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeProduct(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
