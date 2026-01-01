import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currency } = useContext(ShopContext); // optional context usage

  // Example: get saved user info (mock login state)
  const storedUser = JSON.parse(localStorage.getItem("authUser")) || {
    name: "",
    email: "",
  };

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    address: storedUser.address || "",
  });

  // Save profile changes
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("authUser", JSON.stringify(user));
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    if (!storedUser.email) {
      navigate("/login"); // redirect if not logged in
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-semibold text-uppercase mb-1">My <span className="fw-normal">Profile</span></h2>
        <hr className="mx-auto opacity-25" style={{ width: 100 }} />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {!editMode ? (
                <>
                  <h5 className="mb-3">Personal Information</h5>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <strong>Name:</strong> {user.name || "Not provided"}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {user.email || "Not provided"}
                    </li>
                    <li className="list-group-item">
                      <strong>Phone:</strong> {user.phone || "Not provided"}
                    </li>
                    <li className="list-group-item">
                      <strong>Address:</strong> {user.address || "Not provided"}
                    </li>
                  </ul>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-dark w-50 me-2"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="btn btn-outline-danger w-50"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSave}>
                  <h5 className="mb-3">Edit Profile</h5>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-dark w-50 me-2">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-50"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
