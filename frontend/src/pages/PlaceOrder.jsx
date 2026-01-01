
// import React, { useContext, useMemo, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { assets, currency as CURRENCY_FALLBACK } from "../assets/assets";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const {
//     products,
//     cartItems,
//     currency = CURRENCY_FALLBACK || "$",
//     delivery_fee = 10,
//     backendUrl,
//     token,
//     setCartItems,
//   } = useContext(ShopContext);

//   // ---------------- ADDRESS ----------------
//   const [addr, setAddr] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onAddrChange = (e) => {
//     const { name, value } = e.target;
//     setAddr((p) => ({ ...p, [name]: value }));
//   };

//   // ---------------- PAYMENT ----------------
//   const [method, setMethod] = useState("cod");

//   // ---------------- CART → ORDER ITEMS ----------------
//   const { subtotal, itemCount, items } = useMemo(() => {
//     let sum = 0;
//     let count = 0;
//     let itemsArr = [];

//     Object.entries(cartItems || {}).forEach(([pid, bySize]) => {
//       const product = products.find(
//         (p) => String(p._id) === String(pid)
//       );
//       if (!product) return;

//       Object.entries(bySize || {}).forEach(([size, qty]) => {
//         if (qty > 0) {
//           sum += product.price * qty;
//           count += qty;

//           itemsArr.push({
//             itemId: pid,
//             name: product.name,
//             price: product.price,
//             image: product.image, // ✅ REQUIRED FOR ORDERS PAGE
//             size,
//             quantity: qty,
//           });
//         }
//       });
//     });

//     return { subtotal: sum, itemCount: count, items: itemsArr };
//   }, [cartItems, products]);

//   const shipping = itemCount > 0 ? delivery_fee : 0;
//   const total = subtotal + shipping;

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const required = [
//       "firstName",
//       "lastName",
//       "email",
//       "street",
//       "city",
//       "state",
//       "zipcode",
//       "country",
//       "phone",
//     ];

//     for (let key of required) {
//       if (!addr[key].trim()) {
//         toast.error("Please fill all delivery information");
//         return false;
//       }
//     }

//     if (!token) {
//       toast.error("Please login first");
//       navigate("/login");
//       return false;
//     }

//     if (itemCount === 0) {
//       toast.error("Your cart is empty");
//       return false;
//     }

//     return true;
//   };
//   const handlePlaceOrder = async () => {
//     if (!validateForm()) return;

//     try {
//       if (method === "cod") {
//         const res = await axios.post(
//           backendUrl + "/api/order/place",
//           { items, amount: total, address: addr },
//           { headers: { token } }
//         );

//         if (res.data.success) {
//           toast.success("Order placed successfully");
//           setCartItems({});
//           navigate("/order"); // ✅ NOW THIS WILL WORK
//         }
//       }

//       if (method === "stripe") {
//         const res = await axios.post(
//           backendUrl + "/api/order/stripe",
//           { items, amount: total, address: addr },
//           { headers: { token } }
//         );

//         if (res.data.success) {
//           window.location.href = res.data.session_url;
//         }
//       }

//       if (method === "razorpay") {
//         const res = await axios.post(
//           backendUrl + "/api/order/razorpay",
//           { items, amount: total, address: addr },
//           { headers: { token } }
//         );

//         if (res.data.success) {
//           toast.success("Razorpay order created");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Order failed");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row g-4 justify-content-between">

//         {/* LEFT */}
//         <div className="col-lg-7">
//           <h3 className="fw-bold mb-3">
//             DELIVERY <span className="fw-normal">INFORMATION</span>
//           </h3>

//           <div className="row g-3">
//             {[
//               { name: "firstName", placeholder: "First name" },
//               { name: "lastName", placeholder: "Last name" },
//               { name: "email", placeholder: "Email address", type: "email" },
//               { name: "street", placeholder: "Street" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "zipcode", placeholder: "Zipcode" },
//               { name: "country", placeholder: "Country" },
//               { name: "phone", placeholder: "Phone" },
//             ].map((f, i) => (
//               <div
//                 key={i}
//                 className={
//                   ["firstName", "lastName", "city", "state", "zipcode", "country"].includes(f.name)
//                     ? "col-md-6"
//                     : "col-12"
//                 }
//               >
//                 <input
//                   className="form-control"
//                   name={f.name}
//                   type={f.type || "text"}
//                   placeholder={f.placeholder}
//                   value={addr[f.name]}
//                   onChange={onAddrChange}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="col-lg-4">
//           <h3 className="fw-bold mb-3">
//             CART <span className="fw-normal">TOTALS</span>
//           </h3>

//           <ul className="list-group mb-4">
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Subtotal</span>
//               <strong>{currency}{subtotal.toFixed(2)}</strong>
//             </li>
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Shipping Fee</span>
//               <strong>{currency}{shipping.toFixed(2)}</strong>
//             </li>
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Total</span>
//               <strong>{currency}{total.toFixed(2)}</strong>
//             </li>
//           </ul>

//           <h5 className="mb-2">
//             PAYMENT <span className="fw-normal">METHOD</span>
//           </h5>

//           <div className="vstack gap-2">
//             <label className="d-flex align-items-center gap-3 border rounded p-2">
//               <input type="radio" checked={method === "stripe"} onChange={() => setMethod("stripe")} />
//               <img src={assets.stripe_logo} alt="Stripe" height={20} />
//             </label>

//             <label className="d-flex align-items-center gap-3 border rounded p-2">
//               <input type="radio" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} />
//               <img src={assets.razorpay_logo} alt="Razorpay" height={20} />
//             </label>

//             <label className="d-flex align-items-center gap-3 border rounded p-2">
//               <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
//               <span>Cash on Delivery</span>
//             </label>
//           </div>

//           {/* ✅ SAME UI LINK
//           <div className="mt-4">
//             <Link
//               to="/order"
//               onClick={handlePlaceOrder}
//               className={`btn btn-dark w-100 ${itemCount === 0 ? "disabled" : ""}`}
//               title={itemCount === 0 ? "Your cart is empty" : "Place Order"}
//             >
//               Place Order
//             </Link>
//           </div> */}
//           <button
//             type="button"
//             onClick={handlePlaceOrder}
//             className="btn btn-dark w-100"
//             disabled={itemCount === 0}
//           >
//             Place Order
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;

// import React, { useContext, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { assets, currency as CURRENCY_FALLBACK } from "../assets/assets";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const {
//     products,
//     cartItems,
//     currency = CURRENCY_FALLBACK || "$",
//     delivery_fee = 10,
//     backendUrl,
//     token,
//     setCartItems,
//   } = useContext(ShopContext);

//   // ---------------- ADDRESS ----------------
//   const [addr, setAddr] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onAddrChange = (e) => {
//     const { name, value } = e.target;
//     setAddr((p) => ({ ...p, [name]: value }));
//   };

//   // ---------------- PAYMENT ----------------
//   const [method, setMethod] = useState("cod");

//   // ---------------- CART → ORDER ITEMS ----------------
//   const { subtotal, itemCount, items } = useMemo(() => {
//     let sum = 0;
//     let count = 0;
//     let itemsArr = [];

//     Object.entries(cartItems || {}).forEach(([pid, bySize]) => {
//       const product = products.find((p) => String(p._id) === String(pid));
//       if (!product) return;

//       Object.entries(bySize || {}).forEach(([size, qty]) => {
//         if (qty > 0) {
//           sum += product.price * qty;
//           count += qty;

//           itemsArr.push({
//             itemId: pid,
//             name: product.name,
//             price: product.price,
//             image: product.image,
//             size,
//             quantity: qty,
//           });
//         }
//       });
//     });

//     return { subtotal: sum, itemCount: count, items: itemsArr };
//   }, [cartItems, products]);

//   const shipping = itemCount > 0 ? delivery_fee : 0;
//   const total = subtotal + shipping;

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const required = [
//       "firstName",
//       "lastName",
//       "email",
//       "street",
//       "city",
//       "state",
//       "zipcode",
//       "country",
//       "phone",
//     ];

//     for (let key of required) {
//       if (!addr[key] || !addr[key].trim()) {
//         toast.error(`Please fill in your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return false;
//       }
//     }

//     if (!token) {
//       toast.error("Please login to place an order");
//       navigate("/login");
//       return false;
//     }

//     if (itemCount === 0) {
//       toast.error("Your cart is empty");
//       return false;
//     }

//     return true;
//   };

//   const handlePlaceOrder = async () => {
//     if (!validateForm()) return;

//     try {
//       switch (method) {
//         case "cod":
//           const res = await axios.post(
//             backendUrl + "/api/order/place",
//             { items, amount: total, address: addr },
//             { headers: { token } }
//           );

//           if (res.data.success) {
//             setCartItems({});
//             toast.success("Order placed successfully");
//             navigate("/orders"); // Adjust to "/order" if your route is singular
//           } else {
//             toast.error(res.data.message);
//           }
//           break;

//         case "stripe":
//           const resStripe = await axios.post(
//             backendUrl + "/api/order/stripe",
//             { items, amount: total, address: addr },
//             { headers: { token } }
//           );
//           if (resStripe.data.success) {
//             window.location.href = resStripe.data.session_url;
//           } else {
//             toast.error(resStripe.data.message);
//           }
//           break;

//         case "razorpay":
//           const resRazor = await axios.post(
//             backendUrl + "/api/order/razorpay",
//             { items, amount: total, address: addr },
//             { headers: { token } }
//           );
//           if (resRazor.data.success) {
//              // Logic for opening Razorpay Modal would go here
//              toast.info("Razorpay integration triggered");
//           }
//           break;

//         default:
//           break;
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row g-4 justify-content-between">
//         {/* LEFT COLUMN: DELIVERY INFO */}
//         <div className="col-lg-7">
//           <h3 className="fw-bold mb-3">
//             DELIVERY <span className="fw-normal">INFORMATION</span>
//           </h3>
//           <div className="row g-3">
//             {[
//               { name: "firstName", placeholder: "First name" },
//               { name: "lastName", placeholder: "Last name" },
//               { name: "email", placeholder: "Email address", type: "email" },
//               { name: "street", placeholder: "Street" },
//               { name: "city", placeholder: "City" },
//               { name: "state", placeholder: "State" },
//               { name: "zipcode", placeholder: "Zipcode" },
//               { name: "country", placeholder: "Country" },
//               { name: "phone", placeholder: "Phone" },
//             ].map((f, i) => (
//               <div
//                 key={i}
//                 className={
//                   ["firstName", "lastName", "city", "state", "zipcode", "country"].includes(f.name)
//                     ? "col-md-6"
//                     : "col-12"
//                 }
//               >
//                 <input
//                   className="form-control"
//                   name={f.name}
//                   type={f.type || "text"}
//                   placeholder={f.placeholder}
//                   value={addr[f.name]}
//                   onChange={onAddrChange}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT COLUMN: TOTALS & PAYMENT */}
//         <div className="col-lg-4">
//           <h3 className="fw-bold mb-3">
//             CART <span className="fw-normal">TOTALS</span>
//           </h3>
//           <ul className="list-group mb-4">
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Subtotal</span>
//               <strong>{currency}{subtotal.toFixed(2)}</strong>
//             </li>
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Shipping Fee</span>
//               <strong>{currency}{shipping.toFixed(2)}</strong>
//             </li>
//             <li className="list-group-item d-flex justify-content-between">
//               <span>Total</span>
//               <strong>{currency}{total.toFixed(2)}</strong>
//             </li>
//           </ul>

//           <h5 className="mb-2">
//             PAYMENT <span className="fw-normal">METHOD</span>
//           </h5>
//           <div className="vstack gap-2">
//             <label className={`d-flex align-items-center gap-3 border rounded p-2 ${method === 'stripe' ? 'border-primary' : ''}`} style={{cursor: 'pointer'}}>
//               <input type="radio" checked={method === "stripe"} onChange={() => setMethod("stripe")} />
//               <img src={assets.stripe_logo} alt="Stripe" height={20} />
//             </label>
//             <label className={`d-flex align-items-center gap-3 border rounded p-2 ${method === 'razorpay' ? 'border-primary' : ''}`} style={{cursor: 'pointer'}}>
//               <input type="radio" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} />
//               <img src={assets.razorpay_logo} alt="Razorpay" height={20} />
//             </label>
//             <label className={`d-flex align-items-center gap-3 border rounded p-2 ${method === 'cod' ? 'border-primary' : ''}`} style={{cursor: 'pointer'}}>
//               <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
//               <span>Cash on Delivery</span>
//             </label>
//           </div>

//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={handlePlaceOrder}
//               className="btn btn-dark w-100 py-2"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { assets, currency as CURRENCY_FALLBACK } from "../assets/assets";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Fix: Prevent multiple orders

  const {
    products,
    cartItems,
    currency = CURRENCY_FALLBACK || "$",
    delivery_fee = 10,
    backendUrl,
    token,
    setCartItems,
  } = useContext(ShopContext);

  // ---------------- ADDRESS STATE ----------------
  const [addr, setAddr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onAddrChange = (e) => {
    const { name, value } = e.target;
    setAddr((p) => ({ ...p, [name]: value }));
  };

  // ---------------- PAYMENT METHOD ----------------
  const [method, setMethod] = useState("cod");

  // ---------------- DATA CALCULATION ----------------
  const { subtotal, itemCount, items } = useMemo(() => {
    let sum = 0;
    let count = 0;
    let itemsArr = [];

    Object.entries(cartItems || {}).forEach(([pid, bySize]) => {
      const product = products.find((p) => String(p._id) === String(pid));
      if (!product) return;

      Object.entries(bySize || {}).forEach(([size, qty]) => {
        if (qty > 0) {
          sum += product.price * qty;
          count += qty;
          itemsArr.push({
            itemId: pid,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            quantity: qty,
          });
        }
      });
    });
    return { subtotal: sum, itemCount: count, items: itemsArr };
  }, [cartItems, products]);

  const shipping = itemCount > 0 ? delivery_fee : 0;
  const total = subtotal + shipping;

  // ---------------- VALIDATION & REDIRECT LOGIC ----------------
  const handlePlaceOrder = async () => {
    // 1. Check if fields are filled
    const required = Object.keys(addr);
    for (let key of required) {
      if (!addr[key].trim()) {
        return toast.error("Please fill all delivery information");
      }
    }

    if (!token) {
      toast.error("Please login first");
      return navigate("/login");
    }

    if (itemCount === 0) {
      return toast.error("Your cart is empty");
    }

    // 2. Prevent Multiple Clicks
    if (loading) return; 
    setLoading(true);

    try {
      let orderData = {
        address: addr,
        items: items,
        amount: total,
      };

      if (method === "cod") {
        const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
        
        if (response.data.success) {
          setCartItems({});
          toast.success("Order Placed Successfully!");
          navigate("/order"); // This redirects you to the orders list page
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      } else if (method === "stripe") {
        const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
        if (responseStripe.data.success) {
          window.location.href = responseStripe.data.session_url;
        } else {
          toast.error(responseStripe.data.message);
          setLoading(false);
        }
      } else if (method === "razorpay") {
        const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } });
        if (responseRazorpay.data.success) {
          toast.info("Razorpay Payment Initiated");
          // Add Razorpay window logic here if needed
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4 justify-content-between">
        {/* LEFT SIDE - DELIVERY INFO */}
        <div className="col-lg-7">
          <h3 className="fw-bold mb-3">
            DELIVERY <span className="fw-normal">INFORMATION</span>
          </h3>
          <div className="row g-3">
            {[
              { name: "firstName", placeholder: "First name" },
              { name: "lastName", placeholder: "Last name" },
              { name: "email", placeholder: "Email address", type: "email" },
              { name: "street", placeholder: "Street" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zipcode", placeholder: "Zipcode" },
              { name: "country", placeholder: "Country" },
              { name: "phone", placeholder: "Phone" },
            ].map((f, i) => (
              <div
                key={i}
                className={["firstName", "lastName", "city", "state", "zipcode", "country"].includes(f.name) ? "col-md-6" : "col-12"}
              >
                <input
                  className="form-control"
                  name={f.name}
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  value={addr[f.name]}
                  onChange={onAddrChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - CART TOTALS & PAYMENT */}
        <div className="col-lg-4">
          <h3 className="fw-bold mb-3">
            CART <span className="fw-normal">TOTALS</span>
          </h3>
          <ul className="list-group mb-4">
            <li className="list-group-item d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>{currency}{subtotal.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping Fee</span>
              <strong>{currency}{shipping.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{currency}{total.toFixed(2)}</strong>
            </li>
          </ul>

          <h5 className="mb-2">
            PAYMENT <span className="fw-normal">METHOD</span>
          </h5>
          <div className="vstack gap-2">
            <label onClick={() => setMethod('stripe')} className="d-flex align-items-center gap-3 border rounded p-2" style={{cursor: 'pointer'}}>
              <div className={`rounded-circle border ${method === 'stripe' ? 'bg-success' : ''}`} style={{width: '12px', height: '12px'}}></div>
              <img src={assets.stripe_logo} alt="Stripe" height={20} />
            </label>
            <label onClick={() => setMethod('razorpay')} className="d-flex align-items-center gap-3 border rounded p-2" style={{cursor: 'pointer'}}>
              <div className={`rounded-circle border ${method === 'razorpay' ? 'bg-success' : ''}`} style={{width: '12px', height: '12px'}}></div>
              <img src={assets.razorpay_logo} alt="Razorpay" height={20} />
            </label>
            <label onClick={() => setMethod('cod')} className="d-flex align-items-center gap-3 border rounded p-2" style={{cursor: 'pointer'}}>
              <div className={`rounded-circle border ${method === 'cod' ? 'bg-success' : ''}`} style={{width: '12px', height: '12px'}}></div>
              <span className="text-muted small fw-bold">CASH ON DELIVERY</span>
            </label>
          </div>
          
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="btn btn-dark w-100 mt-4 py-2"
          >
            {loading ? "PROCESSING..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;