import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.preventDefault();
    navigate(localStorage.getItem("token") ? "/Profile" : "/signup");
  };

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
                  to="/Goldprice"
                >
                  <i class="fa fa-inr" aria-hidden="true"></i>
                  Goldprice
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Form"
                >
                  <i className="fa-solid fa-landmark-dome"></i>
                  Gold Loan
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/signup"
                >
                  <i className="fa-solid fa-user"></i>
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Cart"
                >
                  <i className="fa-solid fa-cart-arrow-down"></i>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Appointment"
                >
                  <i className="fa-solid fa-business-time"></i>
                  Appointment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Contact"
                >
                  <i className="fa-solid fa-address-book"></i>
                  Contact
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link me-4 d-flex align-items-center gap-2"
                  to="/Profile"
                  onClick={handleProfileClick}
                >
                  <i
                    className="fas fa-user-circle"
                    style={{ color: "rgb(255,212,59)", fontSize: "36px" }}
                  ></i>
                </Link>
              </li>
            </ul>

            <form className="d-flex">
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

/*

<div class="dropdown">
  <i
                    className="fas fa-user-circle"
                    style={{ color: "rgb(255,212,59)", fontSize: "36px" }}
                  ></i>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

*/
