import { useState } from "react";
import { addItemToCart } from "../../utils/cart";
import { getProductImageUrl } from "../../utils/imageUrl";

function Goldbarleft({ item }) {
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
    <div className="container p-5">
      <hr />

      <div className="row align-items-center">

        {/* Image */}
        <div className="col-md-6 text-center">
          <img
            src={getProductImageUrl(item.img_url)}
            alt={item.name}
            style={{ width: "60%" }}
            className="img-fluid"
          />
        </div>

        {/* Details */}
        <div className="col-md-6">
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

          <p className="mb-3">
            <b>Making Charges:</b> {item.making_charges}
          </p>

          <h4 className="mb-4">Price: {item.price} </h4>
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

      </div>
    </div>
  );
}

export default Goldbarleft;
