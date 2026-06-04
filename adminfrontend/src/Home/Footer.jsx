import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-white text-dark pt-5 pb-3 mt-5 p-5 border-top">
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">JEVARAAT</h4>
            <p className="text-muted">
              Timeless jewellery crafted with elegance and purity.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              <FaInstagram size={20} style={{ cursor: "pointer" }} />
              <FaFacebookF size={20} style={{ cursor: "pointer" }} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold">Categories</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Rings
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Bracelets
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Earrings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold">Contact</h6>

            <p className="text-muted mb-2 d-flex align-items-center">
              <MdEmail className="me-2" /> dev71765@gmail.com
            </p>

            <p className="text-muted mb-2 d-flex align-items-center">
              <FaPhoneAlt className="me-2" /> +91 9399683545
            </p>

            <p className="text-muted d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> Sagar, MP
            </p>
          </div>
        </div>

        <hr />
        <div className="text-center text-muted">
          © {new Date().getFullYear()} Jeveraat. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
