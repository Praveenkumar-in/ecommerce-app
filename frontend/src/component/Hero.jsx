import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="container my-4">
    
      <div className="row g-4 align-items-center border border-1 border-secondary-subtle rounded-3 p-4 p-lg-5">
       
        <div className="col-12 col-lg-6">

          
          <div className="d-flex align-items-center gap-2 mb-2" style={{ color: "#414141" }}>
            <span className="d-inline-block" style={{ width: 32, height: 1, background: "#414141" }} />
            <p className="mb-0 fw-medium small">OUR BESTSELLERS</p>
          </div>

         
          <h1 className="prata-regular display-5 display-lg-3 lh-base mb-3" style={{ color: "#141414" }}>
            Latest Arrivals
          </h1>

         
          <div className="d-flex align-items-center gap-2 mb-4" style={{ color: "#414141" }}>
            <span className="d-inline-block" style={{ width: 44, height: 1, background: "#414141" }} />
            <p className="mb-0 fw-semibold small">SHOP NOW</p>
          </div>

          
          <div className="d-flex gap-3">
            <a href="/collection" className="btn btn-dark px-4 py-2">Explore</a>
            <a href="/about" className="btn btn-outline-secondary px-4 py-2">Learn More</a>
          </div>
        </div>

       
        <div className="col-12 col-lg-6">
          <img
            src={assets.hero_img}     // make sure this exists in your assets like in the video
            alt="Hero"
            className="img-fluid rounded-3 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
