
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../component/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, currency } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (!products.length) return;

    const found = products.find(
      (item) => String(item._id) === String(productId)
    );

    if (found) {
      setProductData(found);
      setImage(found.image?.[0] || "");
      setSize("");
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  const handleAdd = () => {
    if (!size) {
      alert("Please select a size first");
      return;
    }
    addToCart(productData._id, size);
  };

  return (
    <div className="container py-5 border-top">
      <div className="row g-4">
        {/* LEFT: images */}
        <div className="col-md-6 d-flex">
          <div className="d-flex flex-md-column overflow-auto me-3">
            {Array.isArray(productData.image) &&
              productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setImage(img)}
                  className="img-thumbnail mb-2"
                  style={{
                    cursor: "pointer",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              ))}
          </div>
          <div className="flex-grow-1">
            {image ? (
              <img src={image} alt="selected" className="img-fluid rounded shadow-sm" />
            ) : (
              <div className="border p-5 text-center text-muted rounded">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{productData.name}</h2>

          <div className="d-flex align-items-center mb-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" width="18" className="me-1" />
            ))}
            <img src={assets.star_dull_icon} alt="star dull" width="18" />
            <span className="ms-2 small text-muted">(122 reviews)</span>
          </div>

          <h4 className="text-dark mb-3">
            {currency}
            {productData.price}
          </h4>

          <p className="text-muted">{productData.description}</p>

          {Array.isArray(productData.sizes) && productData.sizes.length > 0 && (
            <div className="my-4">
              <h6>Select Size:</h6>
              <div className="d-flex flex-wrap gap-2">
                {productData.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`btn btn-outline-dark ${s === size ? "border-warning" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAdd} className="btn btn-dark px-4 py-2">
            Add to Cart
          </button>

          <hr className="my-4" />

          <div className="small text-muted">
            <p className="mb-1">✅ 100% Original product</p>
            <p className="mb-1">💵 Cash on Delivery available</p>
            <p>↩️ 7-day easy return & exchange</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className="mt-5">
        <div className="d-flex">
          <b className="border p-2">Description</b>
          <p className="border p-2 mb-0">Reviews (122)</p>
        </div>
        <div className="border p-3 text-muted small">
          <p className="mb-2">
            This e-commerce platform helps customers explore, compare, and buy products with ease.
          </p>
          <p className="mb-0">
            Each product includes detailed descriptions, specifications, and user reviews to assist your decision.
          </p>
        </div>
      </div>

      {/* Related */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};
export default Product;