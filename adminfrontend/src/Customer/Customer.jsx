import { useEffect, useState } from "react";
import axios from "axios";
import Search from "../Inventory/Search";
import Customerdata from "./Customerdata";

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/users")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Search heading={"search customer"}></Search>
      <Customerdata customers={customers}></Customerdata>
    </>
  );
}

export default Customer;
