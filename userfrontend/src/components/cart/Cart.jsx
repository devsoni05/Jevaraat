import { useEffect, useState } from "react";
import { fetchCart, removeCartItem } from "../../utils/cart";
import { placeOrderFromCart } from "../../utils/orders";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [orderingId, setOrderingId] = useState("");

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await fetchCart();
      setItems(data.items || []);
      setMessage("");
    } catch (err) {
      setMessage(
        err.response?.data?.msg || "Please sign in to view your cart",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const data = await removeCartItem(itemId);
      setItems(data.cart?.items || []);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Unable to remove cart item");
    }
  };

  const handleOrder = async (itemId) => {
    try {
      setOrderingId(itemId);
      const data = await placeOrderFromCart(itemId);
      setItems(data.cart?.items || []);
      setMessage(data.msg || "Order placed successfully");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Unable to place order");
    } finally {
      setOrderingId("");
    }
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div className="container mt-5 pt-5">
        <h3 className="mb-4 text-center">Your Cart</h3>
        {loading && <p>Loading cart...</p>}
        {!loading && message && <div className="alert alert-info">{message}</div>}
        {!loading && !message && items.length === 0 && (
          <div className="alert alert-secondary">Your cart is empty.</div>
        )}
        {!loading &&
          items.map((item) => (
            <div className="card mb-3 p-5" key={item._id}>
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={
                      item.img_url.startsWith("http")
                        ? item.img_url
                        : `https://jevaraat.onrender.com/uploads/${item.img_url}`
                    }
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "170px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6">
                  <h5>{item.name}</h5>
                  <p className="mb-1">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="mb-1">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong> Rs. {item.price}
                  </p>
                  {item.weight && (
                    <p className="mb-1">
                      <strong>Weight:</strong> {item.weight}
                    </p>
                  )}
                  {item.purity && (
                    <p className="mb-1">
                      <strong>Purity:</strong> {item.purity}
                    </p>
                  )}
                </div>
                <div className="col-md-3 text-md-end mt-3 mt-md-0">
                  <p className="fw-bold">Subtotal: Rs. {item.price * item.quantity}</p>
                  <button
                    className="btn btn-dark me-2"
                    onClick={() => handleOrder(item._id)}
                    disabled={orderingId === item._id}
                  >
                    {orderingId === item._id ? "Ordering..." : "Order"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        {!loading && items.length > 0 && (
          <div className="card p-3 mb-5">
            <h4>Total: Rs. {totalAmount}</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
