// src/components/Footer.jsx
import React from "react";
import { assets } from "../assets/assets"; // adjust path if needed
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-top mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand + description */}
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src={assets.logo}
              alt="Brand"
              className="mb-3"
              style={{ width: 140 }}
            />
            <p className="text-secondary mb-0">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Company links */}
          <div className="col-6 col-md-3 col-lg-3">
            <p className="fs-5 fw-semibold mb-3">COMPANY</p>
            <ul className="list-unstyled d-flex flex-column gap-1 text-secondary mb-0">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none">About us</Link></li>
              <li><Link to="/delivery" className="text-secondary text-decoration-none">Delivery</Link></li>
              <li><Link to="/privacy" className="text-secondary text-decoration-none">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="col-6 col-md-3 col-lg-4">
            <p className="fs-5 fw-semibold mb-3">GET IN TOUCH</p>
            <ul className="list-unstyled d-flex flex-column gap-1 text-secondary mb-0">
              <li>+1-212-456-7890</li>
              <li>contact@CARTNEXT.com</li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        <p className="py-3 small text-center text-secondary mb-0">
          Copyright © 2024 CARTNEXT.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
