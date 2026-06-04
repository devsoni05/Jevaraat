function Ordersdata({ orders }) {
  return (
    <>
      <div className="container mt-5 p-2">
        <div className="row text-center">
          <h3>Order Details</h3>
        </div>

        <div className="row mt-3">
          <div className="table-responsive">
            <table
              className="table table-striped table-sm"
              style={{ fontSize: "12px", whiteSpace: "nowrap" }}
            >
              <thead>
                <tr>
                  <th>Customer name</th>
                  <th>Customer id</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                  <th>Metal</th>
                  <th>Purity</th>
                  <th>Weight</th>
                  <th>Stone</th>
                  <th>Size</th>
                  <th>Making</th>
                  <th>Status</th>
                  <th>Ordered on</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="18" className="text-center">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user_name}</td>
                      <td>{order.user_id}</td>

                      <td
                        style={{
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {order.user_email}
                      </td>

                      <td>{order.user_number}</td>

                      <td
                        style={{
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {order.user_address}
                      </td>

                      <td>{order.name}</td>
                      <td>{order.category}</td>
                      <td>{order.quantity}</td>
                      <td>₹ {order.price}</td>
                      <td>₹ {order.total_amount}</td>
                      <td>{order.metal || "-"}</td>
                      <td>{order.purity || "-"}</td>
                      <td>{order.weight || "-"}</td>
                      <td>{order.stone || "-"}</td>
                      <td>{order.size || "-"}</td>
                      <td>{order.making_charge || "-"}</td>
                      <td>{order.status}</td>
                      <td>
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ordersdata;