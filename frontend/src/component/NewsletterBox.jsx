
import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // You can handle form submission here (API call, toast, etc.)
    console.log("Newsletter form submitted!");
  };

  return (
    <div className="container py-5">
      <div className="text-center">
        {/* Heading */}
        <p className="fs-4 fw-medium text-dark">
          Subscribe now &amp; get 20% off
        </p>

        {/* Description */}
        <p className="text-secondary mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {/* Newsletter Form */}
        <form
          onSubmit={onSubmitHandler}
          className="d-flex justify-content-center align-items-center gap-2 flex-wrap"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <input
            type="email"
            className="form-control flex-grow-1"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="btn btn-dark px-4 py-2 text-uppercase">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBox;

