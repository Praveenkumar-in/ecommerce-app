// // src/pages/Collection.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";        // uses your dropdown icon
// import Title from "../component/Title";

// import ProductItem from "../component/ProductItem";

// const Collection = () => {
//   const { products = [] } = useContext(ShopContext);

//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);         // Men, Women, Kids
//   const [subCategory, setSubCategory] = useState([]);   // Topwear, Bottomwear, Winterwear
//   const [sortType, setSortType] = useState("relevant"); // relevant | low-high | high-low

//   // --- toggles ---
//   const toggleCategory = (e) => {
//     const v = e.target.value;
//     setCategory((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
//   };

//   const toggleSubCategory = (e) => {
//     const v = e.target.value;
//     setSubCategory((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
//   };

//   // --- filtering + sorting ---
//   const applyFilter = () => {
//     let copy = products.slice();

//     if (category.length) copy = copy.filter((p) => category.includes(p.category));
//     if (subCategory.length) copy = copy.filter((p) => subCategory.includes(p.subCategory));

//     // apply current sort after filters
//     if (sortType === "low-high") copy.sort((a, b) => a.price - b.price);
//     if (sortType === "high-low") copy.sort((a, b) => b.price - a.price);

//     setFilterProducts
//   useEffect(() => {
//     setFilterProducts(products);
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//     // eslint-disable-next-line
//   }, [category, subCategory, sortType]);

//   return (
//     <div className="container pt-4 border-top">
//       <div className="row g-4">
//         {/* LEFT — Filters */}
//         {/* LEFT — Filters (sticky + scrollable) */}
// <aside className="col-12 col-md-3">
//   {/* make the whole sidebar stick under the navbar */}
//   <div className="position-sticky" style={{ top: 80 }}>
//     {/* header (click to toggle on mobile) */}
//     <div
//       className="d-flex align-items-center justify-content-between mb-2 d-md-none"
//       onClick={() => setShowFilter((s) => !s)}
//       style={{ cursor: "pointer" }}
//     >
//       <p className="my-2 fs-5 mb-0">FILTERS</p>
//       <img
//         src={assets.drop_icon || assets.dropdown_icon}
//         alt="toggle"
//         className={showFilter ? "rotate-90" : ""}
//         style={{ width: 16, height: 16, transition: "transform .25s" }}
//       />
//     </div>

//     {/* SCROLL AREA */}
//     <div
//       className={`sidebar-scroll ${showFilter ? "" : "d-none"} d-md-block`}
//     >
//       {/* Category */}
//       <div className="border rounded p-3 mb-4 bg-white">
//         <p className="mb-3 small fw-medium">CATEGORIES</p>
//         <div className="d-flex flex-column gap-2 small text-secondary">
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Men" onChange={toggleCategory} />
//             Men
//           </label>
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Women" onChange={toggleCategory} />
//             Women
//           </label>
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Kids" onChange={toggleCategory} />
//             Kids
//           </label>
//         </div>
//       </div>

//       {/* Type */}
//       <div className="border rounded p-3 mb-4 bg-white">
//         <p className="mb-3 small fw-medium">TYPE</p>
//         <div className="d-flex flex-column gap-2 small text-secondary">
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Topwear" onChange={toggleSubCategory} />
//             Topwear
//           </label>
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
//             Bottomwear
//           </label>
//           <label className="d-flex align-items-center gap-2">
//             <input className="form-check-input" type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
//             Winterwear
//           </label>
//         </div>
//       </div>

//       {/* You can add more filter blocks here; the column will scroll */}
//     </div>
//   </div>
// </aside>


//         {/* RIGHT — Title + Sort + Grid */}
//         <section className="col-12 col-md-9">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div className="flex-grow-1 text-center">
//               <Title text1={"ALL"} text2={"COLLECTIONS"}/>
//             </div>
//             <select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//               className="form-select form-select-sm ms-3"
//             >
//               <option value="relevant">Sort by: Relevant</option>
//               <option value="low-high">Sort by: Low to High</option>
//               <option value="high-low">Sort by: High to Low</option>
//             </select>
//           </div>

//           {/* Products grid */}
//           <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//             {filterProducts.map((item, index) => (
//               <div className="col" key={index}>
//                 <ProductItem
//                   id={item._id}
//                   name={item.name}
//                   price={item.price}
//                   image={item.image}
//                 />
//               </div>
//             ))}
//             {!filterProducts.length && (
//               <p className="text-muted">No products found.</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );

// };
// export default Collection;
// src/pages/Collection.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../component/Title";
import ProductItem from "../component/ProductItem";

const Collection = () => {
  const { products = [], search = "", showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // ---------------- TOGGLES ----------------
  const toggleCategory = (e) => {
    const v = e.target.value;
    setCategory((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const toggleSubCategory = (e) => {
    const v = e.target.value;
    setSubCategory((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  // ---------------- FILTER + SORT ----------------
  const applyFilter = () => {
    let copy = [...products];

    // SEARCH (name + category + subCategory)
    if (showSearch && search.trim()) {
      const q = search.toLowerCase();
      copy = copy.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      );
    }

    // CATEGORY FILTER
    if (category.length) {
      copy = copy.filter((p) => category.includes(p.category));
    }

    // SUBCATEGORY FILTER
    if (subCategory.length) {
      copy = copy.filter((p) => subCategory.includes(p.subCategory));
    }

    // SORT
    if (sortType === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    }
    if (sortType === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(copy);
  };

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line
  }, [category, subCategory, sortType, search, showSearch]);

  // ---------------- UI ----------------
  return (
    <div className="container pt-4 border-top">
      <div className="row g-4">

        {/* LEFT — FILTERS */}
        <aside className="col-12 col-md-3">
          <div className="position-sticky" style={{ top: 80 }}>
            <div
              className="d-flex align-items-center justify-content-between mb-2 d-md-none"
              onClick={() => setShowFilter((s) => !s)}
              style={{ cursor: "pointer" }}
            >
              <p className="my-2 fs-5 mb-0">FILTERS</p>
              <img
                src={assets.drop_icon || assets.dropdown_icon}
                alt="toggle"
                className={showFilter ? "rotate-90" : ""}
                style={{ width: 16, height: 16 }}
              />
            </div>

            <div className={`${showFilter ? "" : "d-none"} d-md-block`}>

              {/* CATEGORY */}
              <div className="border rounded p-3 mb-4 bg-white">
                <p className="mb-3 small fw-medium">CATEGORIES</p>
                <div className="d-flex flex-column gap-2 small text-secondary">
                  {["Men", "Women", "Kids"].map((c) => (
                    <label key={c} className="d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={c}
                        onChange={toggleCategory}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* TYPE */}
              <div className="border rounded p-3 mb-4 bg-white">
                <p className="mb-3 small fw-medium">TYPE</p>
                <div className="d-flex flex-column gap-2 small text-secondary">
                  {["Topwear", "Bottomwear", "Winterwear"].map((t) => (
                    <label key={t} className="d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={t}
                        onChange={toggleSubCategory}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* RIGHT — PRODUCTS */}
        <section className="col-12 col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="flex-grow-1 text-center">
              <Title text1="ALL" text2="COLLECTIONS" />
            </div>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="form-select form-select-sm ms-3"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {filterProducts.map((item) => (
              <div className="col" key={item._id}>
                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}

            {!filterProducts.length && (
              <p className="text-muted">No products found.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Collection;