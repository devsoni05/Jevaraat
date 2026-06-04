import { useNavigate } from "react-router-dom";
import { clearAdminSession, getAdminUser } from "../auth/storage";

function Profile() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const handleLogout = () => {
    clearAdminSession();
    navigate("/signin");
  };

  return (
    <div className="mt-5 p-5">
      <div className="container p-5">
        <div className="row mb-4">
          <div className="col">
            <h3 className="fw-bold">Admin Profile</h3>
            <p className="text-muted mb-0">
              View your admin account details and manage your session.
            </p>
          </div>
        </div>

        <div className="row">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="adminName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="adminName"
                value={adminUser?.name || ""}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="adminEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="adminEmail"
                value={adminUser?.email || ""}
                readOnly
              />
            </div>

            <div className="col-12">
              <label htmlFor="adminAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="adminAddress"
                value={adminUser?.address || ""}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="adminNumber" className="form-label">
                Phone no
              </label>
              <input
                type="text"
                className="form-control"
                id="adminNumber"
                value={adminUser?.number || ""}
                readOnly
              />
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
