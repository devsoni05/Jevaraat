function Appointmentdata({ appointments }) {
  return (
    <>
      <div className="container mt-3">
        <div className="row text-center">
          <h3>Today's Appointments</h3>
        </div>
        <div className="row mt-5 p-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Customer name</th>
                <th scope="col">Customer id</th>
                <th scope="col">Day</th>
                <th scope="col">Visiting time</th>
                <th scope="col">Reason</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appoint) => (
                <tr key={appoint._id}>
                  <th scope="row">{appoint.user?.name || "Unknown User"}</th>
                  <td>{appoint.user?._id || appoint.user_id}</td>
                  <td>{appoint.day}</td>
                  <td>{appoint.time_slot}</td>
                  <td>{appoint.info}</td>
                  <td>{appoint.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Appointmentdata;
