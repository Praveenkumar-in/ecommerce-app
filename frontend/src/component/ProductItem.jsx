// import React, { useContext } from "react";
// import { Link } from "react-router-dom";

// import { ShopContext } from '../context/ShopContext'
// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="text-decoration-none text-dark"
//       style={{ cursor: "pointer" }}
//     >
//       <div className="overflow-hidden rounded">
//         <img
//           src={image[0]}
//           alt={name}
//           className="img-fluid transition"
//           style={{
//             transition: "transform 0.3s ease-in-out",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
//           onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         />
//       </div>

//       <p className="pt-3 pb-1 small text-secondary mb-0">{name}</p>
//       <p className="small fw-semibold">{currency}{price}</p>
//     </Link>
//   );
// };

//export default ProductItem;
// src/components/ProductItem.jsx

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="text-decoration-none text-dark"
//       style={{ cursor: "pointer" }}
//     >
//       <div className="overflow-hidden rounded">
//         <img
//           src={image?.[0]}            // ✅ SAFE ACCESS
//           alt={name}
//           className="img-fluid transition"
//           style={{ transition: "transform 0.3s ease-in-out" }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.transform = "scale(1.1)")
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.transform = "scale(1)")
//           }
//         />
//       </div>

//       <p className="pt-3 pb-1 small text-secondary mb-0">{name}</p>
//       <p className="small fw-semibold">
//         {currency} {price}
//       </p>
//     </Link>
//   );
// };

// export default ProductItem;

// src/components/ProductItem.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`} className="text-decoration-none text-dark">
      <div className="overflow-hidden rounded">
        <img
          src={image}
          alt={name}
          className="img-fluid"
          style={{
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <p className="pt-3 pb-1 small text-secondary mb-0">{name}</p>
      <p className="small fw-semibold">₹{price}</p>
    </Link>
  );
};

export default ProductItem;