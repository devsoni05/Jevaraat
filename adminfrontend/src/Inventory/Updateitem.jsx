import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InventoryMessage from "./InventoryMessage";

const mapping = {
  ring: "/Mensrings",
  ladiesring: "/Ladiesrings",
  necklace: "/Necklaces",
  goldbar: "/Goldbars",
};
function Updateitem() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const [formData, setFormData] = useState({
    name: data.name || "",
    metal: data.metal || "",
    purity: data.purity || "",
    weight: data.weight || "",
    stone: data.stone || "",
    size: data.size || "",
    price: data.price || "",
    making_charge: data.making_charge || "",
    category: data.category || "",
    description: data.description || "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (image) {
      form.append("img_url", image);
    }
    

    axios
      .patch(`http://localhost:2000/update/${data.category}/${data._id}`, form)
      .then((res) => {
        console.log(res.data);
        setMessageType("success");
        setMessage("Product updated successfully.");
        setTimeout(() => {
          navigate(mapping[data.category], {
            state: {
              inventoryMessage: "Product updated successfully.",
              inventoryMessageType: "success",
            },
          });
        }, 900);
      })
      .catch((err) => {
        console.log(err);
        console.log(data.category);
        setMessageType("danger");
        setMessage("Product could not be updated. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row text-center">
          <h3>Update your product</h3>
        </div>

        <div className="row">
          <div className="col">
            <InventoryMessage
              message={message}
              type={messageType}
              onClose={() => setMessage("")}
            />
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* METAL */}
              <div className="mb-3">
                <label className="form-label">Metal</label>
                <input
                  type="text"
                  className="form-control"
                  name="metal"
                  value={formData.metal}
                  onChange={handleChange}
                />
              </div>

              {/* PURITY */}
              <div className="mb-3">
                <label className="form-label">Purity</label>
                <input
                  type="text"
                  className="form-control"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                />
              </div>

              {/* WEIGHT */}
              <div className="mb-3">
                <label className="form-label">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              {/* STONE */}
              <div className="mb-3">
                <label className="form-label">Stone</label>
                <input
                  type="text"
                  className="form-control"
                  name="stone"
                  value={formData.stone}
                  onChange={handleChange}
                />
              </div>

              {/* SIZE */}
              <div className="mb-3">
                <label className="form-label">Size</label>
                <input
                  type="text"
                  className="form-control"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>

              {/* PRICE */}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              {/* MAKING CHARGE */}
              <div className="mb-3">
                <label className="form-label">Making Charge</label>
                <input
                  type="text"
                  className="form-control"
                  name="making_charge"
                  value={formData.making_charge}
                  onChange={handleChange}
                />
              </div>

              {/* IMAGE */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <br />

                {data?.img_url && (
                  <img
                    src={
                      data.img_url.startsWith("http")
                        ? data.img_url
                        : `http://localhost:2000/uploads/${data.img_url}`
                    }
                    alt="current"
                    style={{
                      width: "140px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}

                <input
                  type="file"
                  className="form-control"
                  onChange={handleImage}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateitem;
