import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="container text-center py-5">
      <div className="row justify-content-around align-items-start gy-4">
        {/* Policy 1 */}
        <div className="col-12 col-sm-4">
          <img
            src={assets.exchange_icon}
            className="img-fluid mb-3"
            style={{ width: "60px" }}
            alt="Easy Exchange Policy"
          />
          <p className="fw-semibold mb-1">Easy Exchange Policy</p>
          <p className="text-muted small">
            We offer a hassle-free exchange policy for your convenience.
          </p>
        </div>

        {/* Policy 2 */}
        <div className="col-12 col-sm-4">
          <img
            src={assets.quality_icon}
            className="img-fluid mb-3"
            style={{ width: "60px" }}
            alt="High Quality Products"
          />
          <p className="fw-semibold mb-1">High Quality Products</p>
          <p className="text-muted small">
            We ensure top-notch quality and customer satisfaction.
          </p>
        </div>

        {/* Policy 3 */}
        <div className="col-12 col-sm-4">
          <img
            src={assets.support_img}
            className="img-fluid mb-3"
            style={{ width: "60px" }}
            alt="24/7 Customer Support"
          />
          <p className="fw-semibold mb-1">24/7 Customer Support</p>
          <p className="text-muted small">
            Our dedicated support team is available any time you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
