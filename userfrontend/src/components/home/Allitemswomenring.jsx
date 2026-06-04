import { useEffect, useState } from "react";
import axios from "axios";
import Internaldisplay from "./Internaldisplay";

function Allitemswomenrings() {

  const [rings, setRings] = useState([]);
    
      useEffect(() => {
        axios
          .get("http://localhost:2000/read/ladiesring")
          .then((res) => {
            setRings(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
    <>
      {rings.map((item) => (
        <Internaldisplay
          item={item}
          flag={false}
          category="ladiesring"
          key={item._id}
        />
      ))}
    </>
  );
}

export default Allitemswomenrings;
