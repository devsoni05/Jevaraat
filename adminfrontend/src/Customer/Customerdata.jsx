function Customerdata({ customers }) {
  return (
    <>
      <div className="container mt-5 p-5">
        <div className="row text-center">
          <h3>Customer Details</h3>
        </div>
        <div className="row mt-5 p-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Customer id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone no.</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <th scope="row">{customer._id}</th>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.number}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Customerdata;
