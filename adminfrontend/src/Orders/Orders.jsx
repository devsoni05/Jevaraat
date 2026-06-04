import { useEffect, useState } from "react";
import axios from "axios";
import Ordersdata from "./Ordersdata";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5 p-5">
      <Ordersdata orders={orders}></Ordersdata>
    </div>
  );
}

export default Orders;
