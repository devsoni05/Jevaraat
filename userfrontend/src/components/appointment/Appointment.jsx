import { useState } from "react";
import axios from "axios";

function Appointment() {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const getInitialFormData = () => ({
    user_id: parsedUser?.id || parsedUser?._id || "",
    day: "",
    time_slot: "",
    info: "",
    description: "",
  });

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setApiError("");
      setSuccessMessage("");
      setIsSubmitting(true);

      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://localhost:2000/appointment",
          {
            ...formData,
            user_id: parsedUser?.id || parsedUser?._id || "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setSuccessMessage("Your appointment is scheduled successfully");
        setFormData(getInitialFormData());
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
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.user_id) {
      newErrors.user_id = "Please sign in before booking an appointment";
    }

    if (!formData.day) {
      newErrors.day = "Please select a day";
    }

    if (!formData.time_slot) {
      newErrors.time_slot = "Please select a time slot";
    }

    if (!formData.info) {
      newErrors.info = "Please select appointment type";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  };

  return (
    <div className="container mt-5 mb-5">
      <br />
      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Book Appointment</h3>

            <form onSubmit={handleSubmit}>
              {errors.user_id && (
                <small className="text-danger d-block mb-3">
                  {errors.user_id}
                </small>
              )}

              {/* Day Selection (No Sunday) */}
              <div className="mb-3">
                <label className="form-label">Select Day</label>
                <select
                  name="day"
                  className="form-select"
                  value={formData.day}
                  onChange={handleChange}
                >
                  <option value="">Choose day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
                {errors.day && (
                  <small className="text-danger">{errors.day}</small>
                )}
              </div>

              {/* Time Slot */}
              <div className="mb-3">
                <label className="form-label">Select Time Slot</label>
                <select
                  name="time_slot"
                  className="form-select"
                  value={formData.time_slot}
                  onChange={handleChange}
                >
                  <option value="">Choose time</option>
                  <option value="11AM-4PM">11 AM - 4 PM</option>
                  <option value="4PM-8PM">4 PM - 8 PM</option>
                </select>
                {errors.time_slot && (
                  <small className="text-danger">{errors.time_slot}</small>
                )}
              </div>

              {/* Appointment Type */}
              <div className="mb-3">
                <label className="form-label">Appointment For</label>
                <select
                  name="info"
                  className="form-select"
                  value={formData.info}
                  onChange={handleChange}
                >
                  <option value="">Select option</option>
                  <option>Gold Loan</option>
                  <option>Sell Gold</option>
                  <option>Book Gold Rates</option>
                  <option>Exchange Old Jewellery</option>
                  <option>Others</option>
                </select>
                {errors.info && (
                  <small className="text-danger">{errors.info}</small>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                  <small className="text-danger">{errors.description}</small>
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
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
