import { Link } from "react-router-dom";
import { getAdminUser } from "../auth/storage";

function Nav() {
  const adminUser = getAdminUser();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand p-4 me-5" to="/">
            <h4>JEVARAAT</h4>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/"
                >
                  <i className="fa-solid fa-house"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Inventory"
                >
                  <i className="fas fa-warehouse"></i>
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Appointments"
                >
                  <i className="fas fa-calendar-check"></i>
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Orders"
                >
                  <i className="fas fa-luggage-cart"></i>
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Payments"
                >
                  <i className="fas fa-credit-card"></i>
                  Payments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Customer"
                >
                  <i className="fas fa-users"></i>
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Profile"
                >
                  <i
                    className="fas fa-user-circle"
                    style={{ color: "rgb(255,212,59)", fontSize: "36px" }}
                  ></i>
                  <span className="small text-dark">
                    {adminUser?.name || "Admin"}
                  </span>
                </Link>
              </li>
            </ul>

            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-success">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
