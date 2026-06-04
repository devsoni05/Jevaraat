import { Link } from "react-router-dom";
function Search({ heading }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "100px", 
        left: "0",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "white",
        padding: "10px 0",
        boxShadow: "0 2px 5px rgba(0,0,0,0)",
      }}
    >
      <div className="container d-flex justify-content-center">
        <div
          className="input-group"
          style={{
            maxWidth: "600px",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <span className="input-group-text bg-white border-end-0">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>

          <input
            type="text"
            className="form-control border-start-0"
            placeholder={`Search ${heading}`}
            style={{ boxShadow: "none" }}
          />

          <button className="btn btn-warning">Search</button>
        </div>
        {heading !== "search customer" && (
          <Link
            to="/Createitem"
            className="btn btn-primary align-items-center justify-content-center ms-5"
            style={{ width: "90px" }}
          >
            ADD
            <i
              className="fa-solid fa-plus"
              style={{ color: "white", fontSize: "13px", textAlign: "center" }}
            ></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Search;
