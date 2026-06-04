import { Link } from "react-router-dom";
function Inventory() {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="container mt-t p-5 text-center">
        <div className="row ">
          <div className="col">
            <h3 className="text-center fw-bold">Check Your Inventory</h3>
          </div>
        </div>

        <div className="row mt-5 p-5 mb-5">
          <div className="col">
            <Link
              to="/Mensrings"
              className="btn btn-primary  align-items-center justify-content-center"
            >
              Mensrings
            </Link>
          </div>
          <div className="col">
            <Link
              to="/Ladiesrings"
              className="btn btn-primary  align-items-center justify-content-center"
            >
              Ladiesrings
            </Link>
          </div>
          <div className="col">
            <Link
              to="/Necklaces"
              className="btn btn-primary  align-items-center justify-content-center"
            >
              Necklaces
            </Link>
          </div>
          <div className="col">
            <Link
              to="/Goldbars"
              className="btn btn-primary  align-items-center justify-content-center"
            >
              Gold bars
            </Link>
          </div>
          <div className="col">
            <Link
              to="/"
              className="btn btn-primary  align-items-center justify-content-center"
            >
              <i
                className="fa-solid fa-plus"
                style={{ color: "white", fontSize: "20px" }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
