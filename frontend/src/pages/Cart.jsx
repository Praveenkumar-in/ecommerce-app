

// import React, { useContext, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const Cart = () => {
//   const {
//     products,
//     cartItems,
//     currency,
//     delivery_fee,
//     updateCartQty,
//     removeFromCart,
//     cartSubtotal,
//     cartTotal,
//   } = useContext(ShopContext);

//   const cartData = useMemo(() => {
//     const rows = [];
//     for (const pid in cartItems) {
//       const product = products.find((p) => String(p._id) === String(pid));
//       if (!product) continue;

//       for (const size in cartItems[pid]) {
//         rows.push({
//           _id: pid,
//           size,
//           qty: cartItems[pid][size],
//           product,
//         });
//       }
//     }
//     return rows;
//   }, [cartItems, products]);


  

//   // ✅ If cart is empty
//   if (cartData.length === 0) {
//     return (
//       <div className="container py-5 border-top text-center">
//         <div
//           className="d-flex justify-content-center align-items-center rounded-circle mx-auto mb-3"
//           style={{
//             width: "90px",
//             height: "90px",
//             background: "var(--bs-secondary-bg)",
//           }}
//         >
//           <i className="bi bi-cart3 fs-1 text-secondary"></i>
//         </div>
//         <h3 className="fw-semibold mb-2">Your cart is empty</h3>
//         <p className="text-muted mb-4">
//           Looks like you haven’t added anything yet.
//         </p>
//         <Link to="/collection" className="btn btn-dark px-4 py-2">
//           <i className="bi bi-arrow-left me-2"></i> Continue Shopping
//         </Link>
//       </div>
//     );
//   }


//   // ✅ If there are items in cart
//   return (
//     <div className="container py-5 border-top">
//       <h3 className="mb-4">Your Cart</h3>

//       <div className="row g-4">
//         {/* Left Section: Cart Items */}
//         <div className="col-lg-8">
//           {cartData.map((row, idx) => (
//             <div
//               key={`${row._id}-${row.size}`}
//               className="py-3 border-bottom d-grid gap-3"
//               style={{ gridTemplateColumns: "80px 1fr auto" }}
//             >
//               <img
//                 src={row.product.image?.[0]}
//                 alt={row.product.name}
//                 className="img-fluid rounded"
//                 style={{ width: 80, height: 80, objectFit: "cover" }}
//               />

//               <div>
//                 <div className="fw-semibold">{row.product.name}</div>
//                 <div className="text-muted small">Size: {row.size}</div>

//                 <div className="mt-2 d-inline-flex align-items-center">
//                   <button
//                     className="btn btn-outline-secondary btn-sm"
//                     onClick={() =>
//                       updateCartQty(row._id, row.size, row.qty - 1)
//                     }
//                     disabled={row.qty <= 1}
//                   >
//                     −
//                   </button>
//                   <span className="px-3">{row.qty}</span>
//                   <button
//                     className="btn btn-outline-secondary btn-sm"
//                     onClick={() =>
//                       updateCartQty(row._id, row.size, row.qty + 1)
//                     }
//                   >
//                     +
//                   </button>
//                   <button
//                     className="btn btn-link text-danger btn-sm ms-3"
//                     onClick={() => removeFromCart(row._id, row.size)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>

//               <div className="text-end">
//                 <div>
//                   {currency}
//                   {(row.product.price * row.qty).toFixed(2)}
//                 </div>
//                 <div className="text-muted small">
//                   {currency}
//                   {row.product.price.toFixed(2)} each
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Section: Summary */}
//         <div className="col-lg-4">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h5 className="card-title">Summary</h5>
//               <div className="d-flex justify-content-between">
//                 <span>Subtotal</span>
//                 <span>
//                   {currency}
//                   {cartSubtotal?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <span>Delivery Fee</span>
//                 <span>
//                   {currency}
//                   {delivery_fee.toFixed(2)}
//                 </span>
//               </div>
//               <hr />
//               <div className="d-flex justify-content-between fw-semibold">
//                 <span>Total</span>
//                 <span>
//                   {currency}
//                   {cartTotal?.toFixed(2) || "0.00"}
//                 </span>
//               </div>
//               {/* <button className="btn btn-dark w-100 mt-3">
//                 Proceed to Checkout
//               </button> */}
//               <Link to="/placeorder" className="btn btn-dark w-100 mt-3 d-flex justify-content-center align-items-center gap-2">
//   <i className="bi bi-box-seam"></i>
//   Place Order
// </Link>


//               <Link
//                 to="/collection"
//                 className="btn btn-outline-secondary w-100 mt-2"
//               >
//                 <i className="bi bi-arrow-left me-2"></i> Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const {
    products,
    cartItems,
    updateQuantity,        // ✅ FIX
    cartSubtotal,
    cartTotal,
  } = useContext(ShopContext);

  const currency = "$";     // ✅ FIX (since currency not in context)
  const delivery_fee = 10;  // ✅ FIX

  const cartData = useMemo(() => {
    const rows = [];
    for (const pid in cartItems) {
      const product = products.find((p) => String(p._id) === String(pid));
      if (!product) continue;

      for (const size in cartItems[pid]) {
        rows.push({
          _id: pid,
          size,
          qty: cartItems[pid][size],
          product,
        });
      }
    }
    return rows;
  }, [cartItems, products]);

  // ✅ EMPTY CART UI (UNCHANGED)
  if (cartData.length === 0) {
    return (
      <div className="container py-5 border-top text-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle mx-auto mb-3"
          style={{
            width: "90px",
            height: "90px",
            background: "var(--bs-secondary-bg)",
          }}
        >
          <i className="bi bi-cart3 fs-1 text-secondary"></i>
        </div>
        <h3 className="fw-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted mb-4">
          Looks like you haven’t added anything yet.
        </p>
        <Link to="/collection" className="btn btn-dark px-4 py-2">
          <i className="bi bi-arrow-left me-2"></i> Continue Shopping
        </Link>
      </div>
    );
  }

  // ✅ CART UI (UNCHANGED)
  return (
    <div className="container py-5 border-top">
      <h3 className="mb-4">Your Cart</h3>

      <div className="row g-4">
        <div className="col-lg-8">
          {cartData.map((row) => (
            <div
              key={`${row._id}-${row.size}`}
              className="py-3 border-bottom d-grid gap-3"
              style={{ gridTemplateColumns: "80px 1fr auto" }}
            >
              <img
                src={row.product.image?.[0]}
                alt={row.product.name}
                className="img-fluid rounded"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />

              <div>
                <div className="fw-semibold">{row.product.name}</div>
                <div className="text-muted small">Size: {row.size}</div>

                <div className="mt-2 d-inline-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(row._id, row.size, row.qty - 1)
                    }
                    disabled={row.qty <= 1}
                  >
                    −
                  </button>

                  <span className="px-3">{row.qty}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(row._id, row.size, row.qty + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="btn btn-link text-danger btn-sm ms-3"
                    onClick={() =>
                      updateQuantity(row._id, row.size, 0)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-end">
                <div>
                  {currency}
                  {(row.product.price * row.qty).toFixed(2)}
                </div>
                <div className="text-muted small">
                  {currency}
                  {row.product.price.toFixed(2)} each
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY UI UNCHANGED */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Summary</h5>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>{currency}{cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span>{currency}{delivery_fee.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-semibold">
                <span>Total</span>
                <span>{currency}{cartTotal.toFixed(2)}</span>
              </div>

              <Link
                to="/placeorder"
                className="btn btn-dark w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
              >
                <i className="bi bi-box-seam"></i>
                Place Order
              </Link>

              <Link
                to="/collection"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                <i className="bi bi-arrow-left me-2"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;