
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_BASE = import.meta.env.VITE_BACKEND_URL;

console.log("api",API_BASE)
const Login = () => {
  const navigate = useNavigate();

  // "Login" or "Sign Up"
  const [mode, setMode] = useState("Login");

  // form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setServerMsg("");
  };

  const validate = () => {
    const err = {};
    if (mode === "Sign Up") {
      if (!form.firstName.trim()) err.firstName = "First name is required";
      if (!form.lastName.trim()) err.lastName = "Last name is required";
    }
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";

    if (!form.password) err.password = "Password is required";
    if (mode === "Sign Up" && form.password !== form.confirm) {
      err.confirm = "Passwords do not match";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerMsg("");

    try {
      const url =
        mode === "Login" ? `${API_BASE}/login` : `${API_BASE}/register`;

      // Backend expects { name, email, password } for register
      const payload =
        mode === "Login"
          ? { email: form.email, password: form.password }
          : {
              name: `${form.firstName} ${form.lastName}`.trim(),
              email: form.email,
              password: form.password,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setServerMsg(data.message || "Something went wrong");
        setSubmitting(false);
        return;
      }

      // Success -> store token + minimal profile
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          email: form.email,
          name:
            mode === "Sign Up"
              ? `${form.firstName} ${form.lastName}`.trim()
              : undefined,
          role: "user",
        })
      );

      // go home (or to account page)
      navigate("/");
    } catch (err) {
      setServerMsg(err.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 480 }}>
        {/* Title */}
        <div className="text-center mb-4">
          <p className="mb-1 text-uppercase small text-secondary">
            {mode === "Login" ? "Welcome back" : "Create account"}
          </p>
          <h1 className="display-6 fw-semibold">{mode}</h1>
          <hr className="opacity-25" />
        </div>

        {/* Server message */}
        {serverMsg && (
          <div className="alert alert-danger py-2">{serverMsg}</div>
        )}

        {/* Sign Up only: first/last name */}
        {mode === "Sign Up" && (
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="col-md-6">
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>
        )}

        {/* Email */}
        <div className="mt-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email address"
            autoComplete="email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mt-3">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            autoComplete={mode === "Login" ? "current-password" : "new-password"}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Sign Up only: confirm password */}
        {mode === "Sign Up" && (
          <div className="mt-3">
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            {errors.confirm && (
              <div className="invalid-feedback">{errors.confirm}</div>
            )}
          </div>
        )}

        {/* Extras */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="form-check">
            <input id="remember" className="form-check-input" type="checkbox" />
            <label htmlFor="remember" className="form-check-label">
              Remember me
            </label>
          </div>
          {mode === "Login" && (
            <button
              type="button"
              className="btn btn-link p-0 small"
              onClick={() => alert("Reset flow not implemented yet")}
            >
              Forgot your password?
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-dark w-100 mt-4"
          disabled={submitting}
        >
          {submitting ? "Please wait..." : mode === "Login" ? "Sign In" : "Sign Up"}
        </button>

        {/* Switch mode */}
        <div className="text-center mt-3">
          {mode === "Login" ? (
            <span className="small">
              New here?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setMode("Sign Up")}
              >
                Create an account
              </button>
            </span>
          ) : (
            <span className="small">
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setMode("Login")}
              >
                Login here
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;