// src/pages/Contact.jsx
import React from "react";
import { assets } from "../assets/assets"; // should contain contact_img (adjust path if needed)
 import NewsletterBox from "../component/NewsletterBox";
const Contact = () => {
  return (
    <div className="container py-5 border-top">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-semibold text-uppercase mb-1">Contact <span className="fw-normal">Us</span></h2>
        <hr className="mx-auto opacity-25" style={{ width: 80 }} />
      </div>

      {/* Main row: image + info */}
      <div className="row g-4 align-items-center mb-5">
        {/* Left: Image */}
        <div className="col-md-6">
          <img
            src={assets?.contact_img || "https://via.placeholder.com/800x500?text=Contact"}
            alt="Contact"
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: 480, objectFit: "cover", width: "100%" }}
          />
        </div>

        {/* Right: Details */}
        <div className="col-md-6">
          <div className="vstack gap-3">
            <p className="fw-semibold fs-5 text-secondary m-0">Our Store</p>
            <p className="text-muted mb-0">
              54709 Willms Station, Suite 350, Washington, USA
            </p>

            <p className="text-muted mb-0">
              Tel: (415) 555-0132 <br />
              Email: <a href="mailto:admin@CartNext.com" className="link-dark">admin@CartNext.com</a>
            </p>

            <p className="fw-semibold fs-5 text-secondary m-0">Careers at CartNext</p>
            <p className="text-muted mb-0">
              Learn more about our teams and job openings. We’re always looking for
              talented people to join us.
            </p>

            <div>
              <button className="btn btn-outline-dark px-4 py-2">
                Browse Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose us (optional section to match the video style) */}
      <div className="mb-4">
        <h3 className="fw-semibold text-uppercase mb-3">
          Why <span className="fw-normal">Choose Us</span>
        </h3>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <b>Quality Assurance</b>
              <p className="text-muted mb-0">
                We meticulously select and vet each product to ensure it meets our stringent quality standards.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <b>Convenience</b>
              <p className="text-muted mb-0">
                With our user-friendly interface and hassle-free checkout, shopping is quick and simple.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-3 h-100">
              <b>Exceptional Service</b>
              <p className="text-muted mb-0">
                Our dedicated support team is here to assist you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* If you have a NewsletterBox component, you can show it here */}
      <NewsletterBox /> 
    </div>
  );
};

export default Contact;
