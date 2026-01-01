

// export default LatestCollection;
// src/components/LatestCollection.jsx
import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="container py-4">
      <h4 className="mb-3">Latest <b>Collections</b></h4>

      <div className="row g-3">
        {products.slice(0, 8).map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item._id}>
            <ProductItem
              id={item._id}                
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
