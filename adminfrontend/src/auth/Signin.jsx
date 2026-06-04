import { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAdminToken, saveAdminSession } from "./storage";

function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingToken = getAdminToken();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const loginAdmin = async () => {
    const res = await axios.post("http://localhost:2000/admin/login", formData);
    const sessionData = {
      token: res.data.token,
      user: res.data.admin,
    };
    saveAdminSession(sessionData);
    return sessionData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError("");
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setApiError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const data = await loginAdmin();
      setSuccessMessage(
        `Login successful${data?.user?.name ? `, welcome ${data.user.name}` : ""}`,
      );
      setFormData({ email: "", password: "" });

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setApiError(
        err.response?.data?.msg || err.response?.data?.error || err.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (existingToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container  mt-5 p-5 ">
      <br /><br /><br /><br />
      <div className="row justify-content-center align-items-center ">
        <div className="col-lg-9">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                <p className="text-uppercase small mb-2 text-warning fw-semibold">
                  Jeveraat Admin
                </p>
                <h2 className="fw-bold mb-3">Welcome back</h2>
                <p className="mb-0 text-white-50">
                  Sign in to manage inventory, appointments, orders, payments,
                  and customer records from one place.
                </p>
              </div>

              <div className="col-md-6 p-4 p-md-5 bg-white">
                <h3 className="text-center mb-4">Admin Sign In</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>

                  {apiError && (
                    <small className="text-danger d-block mb-3">{apiError}</small>
                  )}
                  {successMessage && (
                    <small className="text-success d-block mb-3">
                      {successMessage}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
