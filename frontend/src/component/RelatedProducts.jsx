
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products?.length) return;
    let copy = products.slice();
    if (category) copy = copy.filter(p => p.category === category);
    if (subCategory) copy = copy.filter(p => p.subCategory === subCategory);
    setRelated(copy.slice(0, 8)); // pick a few
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <div className="mt-5">
      <h3 className="fw-bold text-center mb-4">RELATED PRODUCTS</h3>
      <div className="row g-4">
        {related.map(item => (
          <div key={item._id} className="col-6 col-md-3">
            <Link
              to={`/product/${item._id}`}
              className="text-decoration-none text-reset d-block"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.name}
                className="img-fluid rounded shadow-sm mb-2"
              />
              <div className="small">{item.name}</div>
              <div className="fw-semibold">${item.price}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
