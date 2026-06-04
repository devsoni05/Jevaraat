import { useState } from "react";
import axios from "axios";
import InventoryMessage from "./InventoryMessage";
import { useNavigate } from "react-router-dom";

const mapping = {
  ring: "/Mensrings",
  ladiesring: "/Ladiesrings",
  necklace: "/Necklaces",
  goldbar: "/Goldbars",
};

function Createitem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    metal: "",
    purity: "",
    weight: "",
    stone: "",
    size: "",
    price: "",
    making_charge: "",
    category: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("img_url", image);

    axios
      .post(`http://localhost:2000/create/${formData.category}`, data)
      .then((res) => {
        console.log(res.data);
        setMessageType("success");
        setMessage("Product added successfully.");
        setTimeout(() => {
          navigate(mapping[formData.category] || "/Inventory", {
            state: {
              inventoryMessage: "Product added successfully.",
              inventoryMessageType: "success",
            },
          });
        }, 900);
      })
      .catch((err) => {
        console.log(err);
        setMessageType("danger");
        setMessage("Product could not be added. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <>
      <div className="container p-5 mt-5">
        <div className="row text-center ">
          <h3>Upload your product</h3>
        </div>

        <div className="row ">
          <div className="col">
            <InventoryMessage
              message={message}
              type={messageType}
              onClose={() => setMessage("")}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter the name for your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="metal" className="form-label">
                  Metal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="metal"
                  name="metal"
                  placeholder="Enter the metal type"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="purity" className="form-label">
                  Purity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="purity"
                  name="purity"
                  placeholder="Enter the purity of your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Enter the weight for your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="stone" className="form-label">
                  Stone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stone"
                  name="stone"
                  placeholder="Enter the stone used in your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  name="size"
                  placeholder="Enter the size for your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter the price for your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="making" className="form-label">
                  Making Charge
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="making"
                  name="making_charge"
                  placeholder="Enter the making charge for your product"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Product Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="img_url"
                  required
                  onChange={handleImage}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="category"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Open this select menu
                  </option>
                  <option value="necklace">Necklace</option>
                  <option value="ladiesring">Ladiesring</option>
                  <option value="ring">Menring</option>
                  <option value="goldbar">Goldbar</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="validationTextarea" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="validationTextarea"
                  placeholder=" Please enter a description about the product"
                  name="description"
                  required
                  onChange={handleChange}
                ></textarea>
                <div className="invalid-feedback">
                  Please enter a description about the product
                </div>
              </div>
              <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Createitem;
