import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [apiMessageType, setApiMessageType] = useState("danger");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.number)) {
      newErrors.number = "Mobile must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setApiMessage("");
      setIsSubmitting(true);

      try {
        const registerPayload = {
          name: formData.name,
          email: formData.email,
          number: formData.number,
          address: formData.address,
          password: formData.password,
        };

        await axios.post("http://localhost:2000/register", registerPayload);

        const loginRes = await axios.post("http://localhost:2000/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", loginRes.data.token);
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        setFormData({
          name: "",
          email: "",
          number: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        setApiMessageType("success");
        setApiMessage("Account created successfully. Redirecting to home...");
        navigate("/", {
          state: {
            alertMessage: "Account created successfully. You are now logged in.",
          },
        });
      } catch (err) {
        setApiMessageType("danger");
        setApiMessage(
          err.response?.data?.msg || err.response?.data?.error || err.message,
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
      setApiMessage("");
    }
  };

  return (
    <div className="container mt-5 mb-5 p-5">
      <br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Create Account</h3>

            {apiMessage && (
              <div className={`alert alert-${apiMessageType}`} role="alert">
                {apiMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              {/* Email */}
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

              {/* Mobile */}
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  name="number"
                  className="form-control"
                  value={formData.number}
                  onChange={handleChange}
                />
                {errors.number && (
                  <small className="text-danger">{errors.number}</small>
                )}
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-center mt-3 mb-0">
                Already registered?{" "}
                <Link to="/signin" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
