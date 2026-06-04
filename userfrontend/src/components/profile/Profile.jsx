import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../../utils/orders";

function Profile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="mt-5 p-5">
      <div className="container  p-5">
        <div className="row">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                value={parsedUser?.name || ""}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                value={parsedUser?.email || ""}
                readOnly
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                value={parsedUser?.address || ""}
                readOnly
              />
            </div>
            <div className="col-4">
              <label htmlFor="inputAddress2" className="form-label">
                Phone no
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                value={parsedUser?.number || ""}
                readOnly
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Zip
              </label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          
            <div className="col-12">
              <button
                type="button"
                className="btn btn-danger  mt-5"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          </form>
        </div>
      </div>
<div className="container mt-5 p-5">
  <div className="row">
    <h3>Orders</h3>
  </div>
</div>
       <div className="row  p-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Order no.</th>
                <th scope="col">Status</th>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
                <th scope="col">Total</th>
                <th scope="col">Purity</th>
                <th scope="col">Weight</th>
                <th scope="col">Ordered on</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <th scope="row">{order._id}</th>
                    <td>{order.status}</td>
                    <td>{order.name}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td>Rs. {order.price}</td>
                    <td>Rs. {order.total_amount}</td>
                    <td>{order.purity || "-"}</td>
                    <td>{order.weight || "-"}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

     
    </div>
  );
}

export default Profile;
