// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { ShopContext } from "../context/ShopContext";

// const Orders = () => {
//   const { backendUrl, currency, token } = useContext(ShopContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch user orders
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/order/userorders`,
//         {},
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         setOrders(res.data.orders || []);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   return (
//     <div className="container py-5 border-top">
//       <h2 className="text-center fw-semibold mb-4">
//         MY <span className="fw-normal">ORDERS</span>
//       </h2>

//       {loading ? (
//         <div className="text-center text-muted py-5">
//           Loading orders...
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center text-muted py-5">
//           You don’t have any orders yet.
//         </div>
//       ) : (
//         <div className="vstack gap-3">
//           {orders.map((order, index) => (
//             <div key={index} className="py-3 border-bottom text-secondary">
//               {order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="row g-3 align-items-start mb-3"
//                 >
//                   {/* product image */}
//                   <div className="col-auto">
//                     <img
//                       src={item.image?.[0]}
//                       alt={item.name}
//                       className="rounded"
//                       style={{
//                         width: 64,
//                         height: 64,
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>

//                   {/* product info */}
//                   <div className="col">
//                     <p className="mb-1 fs-6 fw-medium text-dark">
//                       {item.name}
//                     </p>
//                     <p className="mb-0">
//                       Price: {currency}
//                       {item.price}
//                     </p>
//                     <p className="mb-0">
//                       Quantity: {item.quantity}
//                     </p>
//                     <p className="mb-0">
//                       Size: {item.size}
//                     </p>
//                   </div>

//                   {/* order meta */}
//                   <div className="col-12 col-md-auto ms-auto">
//                     <p className="mb-1">
//                       <span className="text-muted me-1">
//                         Date:
//                       </span>
//                       {new Date(order.date).toLocaleDateString()}
//                     </p>
//                     <div className="d-flex align-items-center gap-2">
//                       <span
//                         className={`badge rounded-pill ${
//                           order.payment
//                             ? "text-bg-success"
//                             : "text-bg-warning"
//                         }`}
//                       >
//                         {order.payment ? "Paid" : "Pending"}
//                       </span>
//                       <span className="small text-muted">
//                         {order.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* track button */}
//                   <div className="col-12 text-md-end">
//                     <button className="btn btn-outline-dark btn-sm">
//                       Track Order
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container py-5 border-top">
      <h2 className="text-center fw-semibold mb-4">
        MY <span className="fw-normal">ORDERS</span>
      </h2>

      {loading ? (
        <div className="text-center text-muted py-5">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted py-5">
          You don’t have any orders yet.
        </div>
      ) : (
        <div className="vstack gap-3">
          {orders.map((order, index) => (
            <div key={index} className="py-3 border-bottom text-secondary">
              {order.items.map((item, idx) => (
                <div key={idx} className="row g-3 align-items-start mb-3">

                  <div className="col-auto">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="rounded"
                      style={{ width: 64, height: 64, objectFit: "cover" }}
                    />
                  </div>

                  <div className="col">
                    <p className="mb-1 fs-6 fw-medium text-dark">{item.name}</p>
                    <p className="mb-0">Price: {currency}{item.price}</p>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <p className="mb-0">Size: {item.size}</p>
                  </div>

                  <div className="col-12 col-md-auto ms-auto">
                    <p className="mb-1">
                      <span className="text-muted me-1">Date:</span>
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge rounded-pill ${order.payment ? "text-bg-success" : "text-bg-warning"}`}>
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                      <span className="small text-muted">{order.status}</span>
                    </div>
                  </div>

                  <div className="col-12 text-md-end">
                    <button className="btn btn-outline-dark btn-sm">
                      Track Order
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;