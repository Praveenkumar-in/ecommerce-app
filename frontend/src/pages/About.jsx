import React from "react";
import { assets } from "../assets/assets"; // make sure assets.about_img exists
// If you already have a NewsletterBox component, keep this import.
// Otherwise you can remove the import & the <NewsletterBox /> line.
import NewsletterBox from "../component/NewsletterBox";

const About = () => {
  return (
    <div className="container py-4 border-top">
      {/* ABOUT — US */}
      <div className="text-center pt-4">
        <h2 className="fw-semibold text-uppercase mb-1">About <span className="fw-normal">Us</span></h2>
        <hr className="mx-auto opacity-25" style={{ width: 80 }} />
      </div>

      {/* Hero image + text */}
      <div className="row align-items-center gy-4 my-4">
        <div className="col-md-6">
          <img
            className="img-fluid rounded shadow-sm"
            src={assets.about_img}
            alt="About our store"
          />
        </div>
        <div className="col-md-6">
          <p className="lead mb-3">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online.
          </p>
          <p className="text-muted">
            Since our inception, we’ve worked tirelessly to curate a diverse
            selection of products that combine quality, style, and affordability.
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence.
          </p>
          <b className="text-body">Our Mission</b>
          <p className="text-muted mb-0">
            To deliver great products with a seamless experience — from discovery
            to doorstep.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center py-3">
        <h3 className="fw-semibold text-uppercase mb-1">Why <span className="fw-normal">Choose Us</span></h3>
        <hr className="mx-auto opacity-25" style={{ width: 120 }} />
      </div>

      <div className="row g-3 row-cols-1 row-cols-md-3 text-sm">
        <div className="col">
          <div className="border rounded p-4 h-100 d-flex flex-column gap-2">
            <b className="text-body">Quality Assurance</b>
            <p className="text-muted mb-0">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-4 h-100 d-flex flex-column gap-2">
            <b className="text-body">Convenience</b>
            <p className="text-muted mb-0">
              With our user-friendly interface and hassle-free ordering, shopping
              becomes a joy.
            </p>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-4 h-100 d-flex flex-column gap-2">
            <b className="text-body">Exceptional Service</b>
            <p className="text-muted mb-0">
              Our dedicated team is here to assist you at every step — before
              and after your purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter (optional) */}
      <div className="mt-5">
        {/* Remove this if you don’t have the component */}
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
