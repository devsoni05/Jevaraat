import Search from "./Search";
import DeleteConfirmModal from "./DeleteConfirmModal";
import InventoryMessage from "./InventoryMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Goldbarsection({ item, heading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState(item);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    setItems(item);
  }, [item]);

  useEffect(() => {
    if (!location.state?.inventoryMessage) return;

    setMessageType(location.state.inventoryMessageType || "success");
    setMessage(location.state.inventoryMessage);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const clickHandler = (item) => {
    navigate("/Updateitem", {
      state: {
        _id: item._id,
        name: item.name,
        img_url: item.img_url,
        metal: item.metal,
        purity: item.purity,
        weight: item.weight,
        stone: item.stone,
        size: item.size,
        price: item.price,
        making_charge: item.making_charge,
        category: "goldbar",
        description: item.description,
      },
    });
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setMessage("");
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    setIsDeleting(true);
    axios
      .delete(`http://localhost:2000/delete/${heading}/${selectedProduct._id}`)
      .then((res) => {
        console.log(res.data);
        setItems((prev) =>
          prev.filter((product) => product._id !== selectedProduct._id),
        );
        setMessageType("success");
        setMessage("Product deleted successfully.");
        setSelectedProduct(null);
      })
      .catch((err) => {
        console.log(err);
        setMessageType("danger");
        setMessage("Product could not be deleted. Please try again.");
        setSelectedProduct(null);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <>
      {" "}
      <div className="container">
        <br />
        <br />
        <br />
        <hr className="mb-5 p-2 mt-5" />
        <Search heading={heading}></Search>
        <InventoryMessage
          message={message}
          type={messageType}
          onClose={() => setMessage("")}
        />
        <div className="row mt-5 mb-5">
          {items.map((item) => (
            <div className="col-md-3 mb-4 d-flex" key={item._id}>
            <div className="card h-100 w-100" style={{ maxWidth: "18rem" }}>
              <img
                src={
                  item.img_url.startsWith("http")
                    ? item.img_url
                    : `http://localhost:2000/uploads/${item.img_url}`
                }
                className="card-img-top"
                alt="ring"
                style={{ height: "270px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-text mb-2">{item.name}</h5>
                <p className="card-title mb-1">
                  <b>purity: </b>
                  {item.metal}
                </p>
                <p className="card-text mb-1">
                  <b>weight: </b> {item.weight}
                </p>
                <p className="card-text mb-1">
                  <b>size: </b>
                  {item.size}
                </p>
                <p className="card-text mb-2">
                  <b>Price: &#8377;{item.price}</b>
                </p>
                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => clickHandler(item)}
                    >
                      View / Update
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="row"></div>
        <DeleteConfirmModal
          productName={selectedProduct?.name}
          isDeleting={isDeleting}
          onCancel={() => setSelectedProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
}

export default Goldbarsection;
