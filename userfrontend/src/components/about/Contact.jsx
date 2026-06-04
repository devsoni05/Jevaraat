import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
    <div className="container mt-5 mb-5">
        <br /><br /><br />
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">Contact Jevaraat</h3>

            {/* Address */}
            <div className="mb-3 d-flex align-items-start">
              <FaMapMarkerAlt className="me-3 mt-1 text-dark" size={20} />
              <div>
                <h5 className="fw-semibold mb-1">Address</h5>
                <p className="text-muted mb-0">
                  Jevaraat, Sarafa Bazar <br />
                  Sagar, Madhya Pradesh - 470002
                </p>
              </div>
            </div>

            <hr />

            {/* Phone Numbers */}
            <div className="mb-3 d-flex align-items-start">
              <FaPhoneAlt className="me-3 mt-1 text-dark" size={18} />
              <div>
                <h5 className="fw-semibold mb-2">Mobile Numbers</h5>

                <p className="mb-1">
                  <a href="tel:9399683545" className="text-decoration-none text-dark">
                    9399683545
                  </a>{" "}
                  <span className="text-muted">(Manager)</span>
                </p>

                <p className="mb-1">
                  <a href="tel:7999905882" className="text-decoration-none text-dark">
                    7999905882
                  </a>{" "}
                  <span className="text-muted">(Assistant Manager)</span>
                </p>

                <p>
                  <a href="tel:8719001988" className="text-decoration-none text-dark">
                    8719001988
                  </a>{" "}
                  <span className="text-muted">(Owner)</span>
                </p>
              </div>
            </div>

            <hr />

            {/* Email */}
            <div className="mb-3 d-flex align-items-start">
              <MdEmail className="me-3 mt-1 text-dark" size={22} />
              <div>
                <h5 className="fw-semibold mb-1">Email</h5>
                <a
                  href="mailto:dev71765@gmail.com"
                  className="text-decoration-none text-dark"
                >
                  dev71765@gmail.com
                </a>
              </div>
            </div>

            <hr />

            {/* Availability */}
            <div className="d-flex align-items-start">
              <FaClock className="me-3 mt-1 text-dark" size={20} />
              <div>
                <h5 className="fw-semibold mb-1">Availability</h5>
                <p className="text-muted mb-0">
                  Available 11:00 AM – 8:00 PM <br />
                  (Closed on Sundays)
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;