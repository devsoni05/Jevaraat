import { Link } from "react-router-dom";
import { useState } from "react";
import { addItemToCart } from "../../utils/cart";
import { getProductImageUrl } from "../../utils/imageUrl";

function Section({ rings, heading, url }) {
  const [feedbackById, setFeedbackById] = useState({});

  const handleAddToCart = async (item) => {
    try {
      await addItemToCart(item, urlToCategory(url));
      setFeedbackById((current) => ({
        ...current,
        [item._id]: {
          text: `${item.name} added to cart`,
          type: "success",
        },
      }));
    } catch (err) {
      setFeedbackById((current) => ({
        ...current,
        [item._id]: {
          text:
            err.response?.data?.msg || "Please sign in before adding to cart",
          type: "error",
        },
      }));
    }
  };

  return (
    <div className="container">
      <hr className="mb-5 p-2 mt-5" />
      <div className="row mb-4">
        <h3>{heading}</h3>
      </div>
      <div className="row">
        {rings.slice(0, 4).map((item) => (
          <div className="col-md-3 mb-4 d-flex" key={item._id}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={getProductImageUrl(item.img_url)}
                className="card-img-top"
                alt={item.name}
                style={{ height: "270px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-text">{item.name}</h3>
                <p className="card-title">
                  <b>purity: </b>
                  {item.metal}
                </p>
                <p className="card-text">
                  <b>weight: </b> {item.weight}
                </p>
                <p className="card-text">
                  <b>size: </b>
                  {item.size}
                </p>
                <p className="card-text">
                  <b>Price: Rs. {item.price}</b>
                </p>
                {feedbackById[item._id] && (
                  <small
                    className={`d-block mb-2 ${
                      feedbackById[item._id].type === "success"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {feedbackById[item._id].text}
                  </small>
                )}
                <button
                  className="btn btn-dark mt-auto"
                  onClick={() => handleAddToCart(item)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <Link to={url}>
            <button type="button" className="btn btn-primary">
              MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function urlToCategory(url) {
  if (url === "/Allitems") {
    return "ring";
  }

  if (url === "/Allitemswomenrings") {
    return "ladiesring";
  }

  if (url === "/Allitemnecklace") {
    return "necklace";
  }

  return "ring";
}

export default Section;
