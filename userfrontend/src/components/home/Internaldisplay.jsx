import { useState } from "react";
import { addItemToCart } from "../../utils/cart";

function Internaldisplay({ item, flag, category }) {
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const handleAddToCart = async () => {
    try {
      await addItemToCart(item, category);
      setFeedback({
        text: `${item.name} added to cart`,
        type: "success",
      });
    } catch (err) {
      setFeedback({
        text: err.response?.data?.msg || "Please sign in before adding to cart",
        type: "error",
      });
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mt-4 my-5">
        <div className="card p-3">
          <div className="row g-4 align-items-center">
            <div className="col-md-5 text-center">
              <img
                src={
                  item.img_url.startsWith("http")
                    ? item.img_url
                    : `http://localhost:2000/uploads/${item.img_url}`
                }
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>

            <div className="col-md-7">
              <h4 className="mb-3">{item.name}</h4>

              <p className="text-muted mb-2">{item.description}</p>

              <p>
                <strong>Metal:</strong> {item.metal}
              </p>
              <p>
                <strong>Purity:</strong> {item.purity}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight}
              </p>
              <p>
                <strong>Stone:</strong> {item.stone}
              </p>
              <p>
                <strong>Size:</strong> {item.size}
              </p>

              <p className="mb-2">
                <strong>Making Charge:</strong> {item.making_charge}
              </p>

              <h5 className="text-dark mb-3">Price: Rs. {item.price}</h5>
              {feedback.text && (
                <p
                  className={
                    feedback.type === "success" ? "text-success" : "text-danger"
                  }
                >
                  {feedback.text}
                </p>
              )}

              {flag === false ? (
                <button className="btn btn-dark px-4" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              ) : (
                <button className="btn btn-dark px-4 mx-5">Order</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Internaldisplay;
