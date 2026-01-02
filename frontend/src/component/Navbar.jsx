
import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const links = [
  { label: "Home", to: "/", end: true },
  { label: "Collection", to: "/collection" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  // ✅ LOGIC FIX ONLY (NO UI CHANGE)
  const {
    setShowSearch,
    showSearch,
    cartCount,        // ✅ correct
    navigate,
    token,
    setToken,
    setCartItems,
    // ✅ function, NOT {}
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // ✅ Manual offcanvas close fallback
  const closeOffcanvasManually = () => {
    const el = document.getElementById("mobileMenu");
    if (el) {
      el.classList.remove("show");
      el.setAttribute("aria-hidden", "true");
      el.removeAttribute("aria-modal");
      document.body.style.overflow = "";
    }
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) backdrop.parentNode?.removeChild(backdrop);
  };

  const onMobileLinkClick = () => closeOffcanvasManually();

  return (
    <div className="container-fluid border-bottom bg-white sticky-top">
      <div className="row align-items-center py-3 fw-semibold">

        {/* ---------- Left: Logo ---------- */}
        <div className="col-6 col-md-3 d-flex align-items-center">
          <Link to="/" className="text-decoration-none">
            <img src={assets.logo} alt="Logo" style={{ width: 120 }} />
          </Link>
        </div>

        {/* ---------- Center: Desktop Nav ---------- */}
        <div className="d-none d-md-flex col-md-6 justify-content-center">
          <ul className="d-flex gap-4 list-unstyled mb-0 text-secondary small">
            {links.map(({ label, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className="text-decoration-none text-secondary"
              >
                {({ isActive }) => (
                  <div className="d-flex flex-column align-items-center gap-1 position-relative">
                    <span className={isActive ? "text-dark" : ""}>{label}</span>
                    <div
                      className={`underline ${isActive ? "underline-active" : ""
                        }`}
                    ></div>
                  </div>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* ---------- Right: Icons + Mobile Menu ---------- */}
        <div className="col-6 col-md-3 d-flex justify-content-end align-items-center gap-3">

          {/* Search */}
          <i
            className="bi bi-search text-secondary fs-5"
            onClick={() => setShowSearch(true)}
            style={{ cursor: "pointer" }}
          />

          {/* Profile dropdown */}
          <div className="dropdown">
            <button
              className="btn p-0 bg-transparent border-0"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-lines-fill text-secondary fs-5" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <Link className="dropdown-item" to="/profile">My Profile</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/order">Orders</Link>
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center gap-2 admin-link"
                  href="https://ecommerce-admin-sigma-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-speedometer2 fs-6 text-dark"></i>
                  <span>Admin Panel</span>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>


              {token ? (
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link className="dropdown-item text-danger" to="/login">
                    <i className="bi bi-box-arrow-in-left"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* ✅ Cart icon with live badge (FIXED) */}
          <Link to="/cart" className="position-relative text-secondary fs-5">
            <i className="bi bi-cart-plus" />
            {cartCount > 0 && (
              <span
                className="position-absolute translate-middle badge rounded-pill bg-dark text-white d-flex align-items-center justify-content-center"
                style={{
                  width: 16,
                  height: 16,
                  fontSize: 8,
                  right: -5,
                  bottom: -5,
                  transform: "scale(1.1)",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>


          {/* Hamburger (mobile only) */}
          <button
            className="btn p-0 d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            aria-label="Open menu"
          >
            <i className="bi bi-list fs-3" />
          </button>
        </div>
      </div>

      {/* ---------- Offcanvas for small screens ---------- */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="mobileMenuLabel" className="mb-0">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={closeOffcanvasManually}
          />
        </div>

        <div className="offcanvas-body d-flex flex-column gap-2">
          {links.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="btn btn-dark w-100"
              onClick={onMobileLinkClick}
            >
              {label}
            </Link>
          ))}

          <hr className="my-3" />

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary w-100"
              data-bs-dismiss="offcanvas"
              onClick={closeOffcanvasManually}
            >
              Back
            </button>
            <Link
              className="btn btn-dark w-100"
              to="/cart"
              onClick={onMobileLinkClick}
            >
              <i className="bi bi-cart me-1" /> Cart ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}