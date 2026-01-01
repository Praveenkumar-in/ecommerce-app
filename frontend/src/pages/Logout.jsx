import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // optional: if you have logout image here

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove user info
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");

    alert("✅ You have been logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6">
          {/* Optional image */}
          <img
            src={assets.logout_img || "https://cdn-icons-png.flaticon.com/512/1828/1828490.png"}
            alt="Logout Illustration"
            className="img-fluid mb-4"
            style={{ maxWidth: "180px" }}
          />

          {/* Title */}
          <h2 className="fw-semibold text-uppercase mb-2">
            Ready to <span className="fw-normal text-danger">Log Out?</span>
          </h2>
          <hr className="mx-auto opacity-25" style={{ width: "100px" }} />

          {/* Description */}
          <p className="text-muted mb-4">
            Logging out will securely end your session.  
            You can always log in again to access your account, manage your orders, and explore our latest collections.
          </p>

          {/* Logout Button */}
          <button
            className="btn btn-danger btn-lg px-4"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Log Out
          </button>

          {/* Optional back link */}
          <div className="mt-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-1"></i> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
