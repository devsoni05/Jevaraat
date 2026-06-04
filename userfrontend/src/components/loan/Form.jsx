import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const [items, setItems] = useState(1);
  const [weights, setWeights] = useState([""]);
  const [huids, setHuids] = useState([""]);
  const [totalWeight, setTotalWeight] = useState(0);

  const handleItemChange = (e) => {
    const count = parseInt(e.target.value);
    setItems(count);
    setWeights(Array(count).fill(""));
    setHuids(Array(count).fill(""));
    setTotalWeight(0);
  };

  const handleWeightChange = (index, value) => {
    const updated = [...weights];
    updated[index] = value;
    setWeights(updated);

    const total = updated.reduce((sum, w) => sum + (parseFloat(w) || 0), 0);
    setTotalWeight(total);
  };

  const handleHuidChange = (index, value) => {
    const updated = [...huids];
    updated[index] = value;
    setHuids(updated);
  };

  const handleSubmit = () => {
    localStorage.setItem("totalWeight", totalWeight);
    navigate("/Value");
  };

  return (
    <div className="container mt-5 p-5">
      <div className="row mb-4">
        <h3 className="text-center fw-bold">Borrow Money Against Your Gold</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Select Number of Gold Items
              </label>
              <select
                className="form-select"
                value={items}
                onChange={handleItemChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <hr />

            {weights.map((weight, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <h6 className="fw-semibold">Item {index + 1}</h6>

                <div className="mb-2">
                  <label className="form-label">Weight (grams)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label">HUID Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={huids[index]}
                    onChange={(e) => handleHuidChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}

            <hr />

            <div className="text-center">
              <h5 className="fw-bold">
                Total Gold Weight: {totalWeight.toFixed(2)} grams
              </h5>

              <button
                type="button"
                className="btn btn-dark mt-3"
                onClick={handleSubmit}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
