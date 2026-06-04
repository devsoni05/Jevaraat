import { useState } from "react";
import { addItemToCart } from "../../utils/cart";

function Goldbarright({ item }) {
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const handleAddToCart = async () => {
    try {
      await addItemToCart(item, "goldbar");
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
    <div className="container mt-5 p-5">
      <hr />

      <div className="row align-items-center">
        {/* Product Details */}
        <div className="col-md-6 text-center">
          <h3 className="mb-3">{item.name}</h3>

          <p className="mb-3">{item.description}</p>

          <p className="mb-2">
            <b>Weight:</b> {item.weight}
          </p>
          <p className="mb-2">
            <b>Size:</b> {item.size}
          </p>
          <p className="mb-2">
            <b>Purity:</b> {item.purity}
          </p>

          <p className="mb-2">
            <b>Metal:</b> {item.metal}
          </p>

          <p className="mb-3">
            <b>Making Charges:</b> {item.making_charges}
          </p>

          <h4 className="mb-4">Price: {item.price}</h4>
          {feedback.text && (
            <p
              className={
                feedback.type === "success" ? "text-success" : "text-danger"
              }
            >
              {feedback.text}
            </p>
          )}

          <button className="btn btn-dark" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>

        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={item.img_url}
            alt={item.title}
            className="img-fluid"
            style={{ width: "60%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Goldbarright;
