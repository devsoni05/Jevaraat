import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

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

  const loginUser = async () => {
    const res = await axios.post("https://jevaraat.onrender.com/login", formData);
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("token")) {
      setErrors({});
      setApiError("");
      setSuccessMessage("");
      setWarningMessage("You are already logged in.");
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setApiError("");
      setSuccessMessage("");
      setWarningMessage("");
      setIsSubmitting(true);

      try {
        const data = await loginUser();
        setFormData({ email: "", password: "" });

        setSuccessMessage(
          `Login successful${data?.user?.name ? `, welcome ${data.user.name}` : ""}`,
        );
        navigate("/");
      } catch (err) {
        setApiError(
          err.response?.data?.msg || err.response?.data?.error || err.message,
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
      setApiError("");
      setSuccessMessage("");
      setWarningMessage("");
    }
  };

  return (
    <div className="container mt-5 p-5 mb-5">
      <br />
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Welcome Back</h3>

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
              {warningMessage && (
                <div className="alert alert-warning py-2" role="alert">
                  {warningMessage}
                </div>
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
  );
}

export default Signin;
