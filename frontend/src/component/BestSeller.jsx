
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {

    const bestProducts = products.filter(
      (item) => item.bestseller === true || item.bestseller === "true"
    );


    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-5">
      <div className="text-center py-4">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mx-auto text-muted" style={{ maxWidth: 680 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 g-lg-4">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;