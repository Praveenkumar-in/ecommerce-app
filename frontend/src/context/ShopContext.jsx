
// import { createContext, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const ShopContext = createContext();

// // ✅ REQUIRED deep clone
// const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// const ShopContextProvider = ({ children }) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [token, setToken] = useState("");

//   const navigate = useNavigate();

//   // ---------------- PRODUCTS ----------------
//   const getProductsData = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/product/list");
//       const list = res.data.data || res.data.products || [];
//       setProducts(list.reverse());
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // ---------------- CART ACTIONS ----------------
//   const addToCart = (itemId, size) => {
//     if (!itemId || !size) return;

//     const cartData = deepClone(cartItems);
//     cartData[itemId] ??= {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     setCartItems(cartData);
//   };

//   const updateCartQty = (itemId, size, qty) => {
//     const cartData = deepClone(cartItems);
//     if (!cartData[itemId]) return;

//     if (qty <= 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }
//     } else {
//       cartData[itemId][size] = qty;
//     }

//     setCartItems(cartData);
//   };

//   const removeFromCart = (itemId, size) => {
//     updateCartQty(itemId, size, 0);
//   };

//   // ---------------- CART CALCULATIONS ----------------
//   const cartSubtotal = useMemo(() => {
//     let total = 0;
//     for (const pid in cartItems) {
//       const product = products.find((p) => String(p._id) === String(pid));
//       if (!product) continue;
//       for (const sz in cartItems[pid]) {
//         total += product.price * cartItems[pid][sz];
//       }
//     }
//     return total;
//   }, [cartItems, products]);

//   const cartCount = useMemo(() => {
//     let count = 0;
//     for (const pid in cartItems) {
//       for (const sz in cartItems[pid]) {
//         count += cartItems[pid][sz];
//       }
//     }
//     return count;
//   }, [cartItems]);

//   const cartTotal = useMemo(
//     () => (cartCount > 0 ? cartSubtotal + delivery_fee : 0),
//     [cartSubtotal, cartCount]
//   );

//   // DEBUG (optional)
//   useEffect(() => {
//    // console.log("🛒 CART:", cartItems);
//   }, [cartItems]);

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     updateCartQty,
//     removeFromCart,
//     cartSubtotal,
//     cartTotal,
//     cartCount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


//temp

// import { createContext, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const ShopContext = createContext();

// // ✅ REQUIRED deep clone
// const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// const ShopContextProvider = ({ children }) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [token, setToken] = useState("");

//   const navigate = useNavigate();

//   // ---------------- PRODUCTS ----------------
//   const getProductsData = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/product/list");
//       const list = res.data.data || res.data.products || [];
//       setProducts(list.reverse());
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // ---------------- CART ACTIONS ----------------
//   const addToCart = (itemId, size) => {
//     if (!itemId || !size) return;

//     const cartData = deepClone(cartItems);
//     cartData[itemId] ??= {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     setCartItems(cartData);
//   };

//   const updateCartQty = (itemId, size, qty) => {
//     const cartData = deepClone(cartItems);
//     if (!cartData[itemId]) return;

//     if (qty <= 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }
//     } else {
//       cartData[itemId][size] = qty;
//     }

//     setCartItems(cartData);
//   };

//   const removeFromCart = (itemId, size) => {
//     updateCartQty(itemId, size, 0);
//   };

//   // ---------------- CART CALCULATIONS ----------------
//   const cartSubtotal = useMemo(() => {
//     let total = 0;
//     for (const pid in cartItems) {
//       const product = products.find((p) => String(p._id) === String(pid));
//       if (!product) continue;
//       for (const sz in cartItems[pid]) {
//         total += product.price * cartItems[pid][sz];
//       }
//     }
//     return total;
//   }, [cartItems, products]);

//   const cartCount = useMemo(() => {
//     let count = 0;
//     for (const pid in cartItems) {
//       for (const sz in cartItems[pid]) {
//         count += cartItems[pid][sz];
//       }
//     }
//     return count;
//   }, [cartItems]);

//   const cartTotal = useMemo(
//     () => (cartCount > 0 ? cartSubtotal + delivery_fee : 0),
//     [cartSubtotal, cartCount]
//   );

//   // DEBUG (optional)
//   useEffect(() => {
//    // console.log("🛒 CART:", cartItems);
//   }, [cartItems]);
  
  
//       useEffect(() => {
//           if (!token && localStorage.getItem('token')) {
//               setToken(localStorage.getItem('token'))
//               getUserCart(localStorage.getItem('token'))
//           }
//           if (token) {
//               getUserCart(token)
//           }
//       }, [token])

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     updateCartQty,
//     removeFromCart,
//     cartSubtotal,
//     cartTotal,
//     cartCount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

//  export default ShopContextProvider;
//  // try import { createContext, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [token, setToken] = useState("");

//   const navigate = useNavigate();

//   /* ---------------- PRODUCTS ---------------- */
//   const getProductsData = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/product/list");
//       if (res.data.success) {
//         setProducts(res.data.products.reverse());
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   /* ---------------- CART ---------------- */
//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Select product size");
//       return;
//     }

//     const cartData = structuredClone(cartItems);
//     cartData[itemId] ??= {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/add",
//           { itemId, size },
//           { headers: { token } }
//         );
//       } catch (err) {
//         toast.error(err.message);
//       }
//     }
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     const cartData = structuredClone(cartItems);

//     if (quantity <= 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }
//     } else {
//       cartData[itemId][size] = quantity;
//     }

//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/update",
//           { itemId, size, quantity },
//           { headers: { token } }
//         );
//       } catch (err) {
//         toast.error(err.message);
//       }
//     }
//   };

//   const getUserCart = async (tk) => {
//     try {
//       const res = await axios.post(
//         backendUrl + "/api/cart/get",
//         {},
//         { headers: { token: tk } }
//       );
//       if (res.data.success) {
//         setCartItems(res.data.cartData);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   /* ---------------- CART CALCULATIONS ---------------- */
//   const getCartCount = () => {
//     let count = 0;
//     console.log(count)
//     for (const pid in cartItems) {
//       for (const sz in cartItems[pid]) {
//         count += cartItems[pid][sz];
//       }
//     }
//     return count;
//   };

//   const cartSubtotal = useMemo(() => {
//     let total = 0;
//     for (const pid in cartItems) {
//       const product = products.find((p) => p._id === pid);
//       if (!product) continue;
//       for (const sz in cartItems[pid]) {
//         total += product.price * cartItems[pid][sz];
//       }
//     }
//     return total;
//   }, [cartItems, products]);

//   const cartTotal =
//     getCartCount() > 0 ? cartSubtotal + delivery_fee : 0;

//   /* ---------------- EFFECTS ---------------- */
//   useEffect(() => {
//     getProductsData();
//   }, []);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (!token && savedToken) {
//       setToken(savedToken);
//       getUserCart(savedToken);
//     }
//     if (token) {
//       getUserCart(token);
//     }
//   }, [token]);

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateQuantity,
//     getCartCount,
//     cartSubtotal,
//     cartTotal,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// // export default ShopContextProvider;

// import { createContext, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const delivery_fee = 10;

//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);

//   const navigate = useNavigate();

//   // ---------------- PRODUCTS ----------------
//   const getProductsData = async () => {
//     const res = await axios.get(backendUrl + "/api/product/list");
//     if (res.data.success) setProducts(res.data.products.reverse());
//   };

//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // ---------------- CART (LOCAL + DB) ----------------
//   const addToCart = async (itemId, size) => {
//     if (!size) return;

//     const cart = structuredClone(cartItems);
//     cart[itemId] ??= {};
//     cart[itemId][size] = (cart[itemId][size] || 0) + 1;
//     setCartItems(cart);

//     if (token) {
//       await axios.post(
//         backendUrl + "/api/cart/add",
//         { itemId, size },
//         { headers: { token } }
//       );
//     }
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     const cart = structuredClone(cartItems);

//     if (quantity <= 0) {
//       delete cart[itemId][size];
//       if (Object.keys(cart[itemId]).length === 0) delete cart[itemId];
//     } else {
//       cart[itemId][size] = quantity;
//     }

//     setCartItems(cart);

//     if (token) {
//       await axios.post(
//         backendUrl + "/api/cart/update",
//         { itemId, size, quantity },
//         { headers: { token } }
//       );
//     }
//   };

//   const getUserCart = async (tok) => {
//     const res = await axios.post(
//       backendUrl + "/api/cart/get",
//       {},
//       { headers: { token: tok } }
//     );
//     if (res.data.success) setCartItems(res.data.cartData || {});
//   };

//   // ---------------- CART COUNT ----------------
//   const cartCount = useMemo(() => {
//     let count = 0;
//     for (const pid in cartItems)
//       for (const size in cartItems[pid])
//         count += cartItems[pid][size];
//     return count;
//   }, [cartItems]);

//   // ---------------- CART TOTAL ----------------
//   const cartSubtotal = useMemo(() => {
//     let total = 0;
//     for (const pid in cartItems) {
//       const product = products.find(p => p._id === pid);
//       if (!product) continue;
//       for (const size in cartItems[pid]) {
//         total += product.price * cartItems[pid][size];
//       }
//     }
//     return total;
//   }, [cartItems, products]);

//   const cartTotal = cartCount ? cartSubtotal + delivery_fee : 0;

//   // ---------------- TOKEN HANDLING ----------------
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//       getUserCart(token);
//     }
//   }, [token]);

//   const value = {
//     products,
//     cartItems,
//     addToCart,
//     updateQuantity,
//     cartCount,
//     cartSubtotal,
//     cartTotal,
//     setCartItems,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     token,
//     setToken,
//     navigate,
//     backendUrl,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
     const [search, setSearch] = useState("");
   const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // PRODUCTS
  const getProductsData = async () => {
    const res = await axios.get(backendUrl + "/api/product/list");
    if (res.data.success) setProducts(res.data.products);
  };

  // CART
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId] ??= {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        { headers: { token } }
      );
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, size, quantity },
        { headers: { token } }
      );
    }
  };

  const getUserCart = async (tk) => {
    const res = await axios.post(
      backendUrl + "/api/cart/get",
      {},
      { headers: { token: tk } }
    );
    if (res.data.success) setCartItems(res.data.cartData);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, [token]);

  // COUNTS
  const cartCount = useMemo(() => {
    let c = 0;
    for (const pid in cartItems) {
      for (const s in cartItems[pid]) {
        if (cartItems[pid][s] > 0) c += cartItems[pid][s];
      }
    }
    return c;
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    let sum = 0;
    for (const pid in cartItems) {
      const p = products.find(x => x._id === pid);
      if (!p) continue;
      for (const s in cartItems[pid]) {
        sum += p.price * cartItems[pid][s];
      }
    }
    return sum;
  }, [cartItems, products]);

  const cartTotal = cartCount > 0 ? cartSubtotal + 10 : 0;

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        updateQuantity,
           search,
    setSearch,
    showSearch,
     setShowSearch,
        cartCount,
        cartSubtotal,
        cartTotal,
        token,
        setToken,
        navigate,
        backendUrl,
        setCartItems
       // setShowSearch
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;