import Goldbarsection from "./Goldbarsection";
import { useEffect, useState } from "react";
import axios from "axios";

function Goldbar() {
const [goldbar, setgoldbar] = useState([]);
  
  useEffect(() => {
      axios
        .get("https://jevaraat.onrender.com/read/goldbar")
        .then((res) => {
          setgoldbar(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  return (
    <>
      <Goldbarsection item={goldbar} heading={"goldbar"}></Goldbarsection>
    </>
  );
}

export default Goldbar;
