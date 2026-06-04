function Value() {
  const weight = parseFloat(localStorage.getItem("totalWeight") || 0);
  const loanAmount = weight * 20000;

  return (
    <div className="container mt-5 p-5">
      <div className="row mb-4">
        <h3 className="text-center fw-bold">Your Loan Estimate</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4 text-center">
            <p className="text-muted mb-2">Total Gold Weight</p>
            <h4 className="fw-bold mb-4">{weight.toFixed(2)} grams</h4>

            <hr />

            <p className="text-muted mt-3 mb-2">Estimated Loan Amount</p>
            <h2 className="fw-bold text-dark mb-0">
              {"\u20B9"}
              {loanAmount.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Value;
