import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email & password");
    try {
      setBusy(true);

      const res = await axios.post(
       // `${backendUrl}/api/user/admin/login`,

        backendUrl + "/api/user/admin/login",
        { email, password },
        console.log("backend",backendUrl)
      );
      if (res.data?.success && res.data?.token) {
        setToken(res.data.token);
        toast.success("Logged in");
      } else {
        toast.error(res.data?.message || "Invalid admin credentials");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light w-100">
      <div className="card shadow border-0" style={{ maxWidth: 420, width: "90%" }}>
        <div className="card-body p-4">
          <h1 className="h4 fw-bold mb-4 text-dark">Admin Panel</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label text-muted small">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={busy}
            >
              {busy ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
