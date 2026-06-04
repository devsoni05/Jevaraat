function Succalert({ item }) {
  return (
    <div className="container mt-5 p-5">
      <div className="row mt-5 p-5">
        <h3>
          <div class="alert alert-primary" role="alert">
            {item} added successfully to the inventory{" "}
          </div>
        </h3>
      </div>
    </div>
  );
}

export default Succalert;
