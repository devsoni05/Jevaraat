import { useEffect, useState } from "react";
import axios from "axios";

import Section from "./Section";
function Ladiesrings() {
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
      {" "}
      <Section item={rings} heading={"ladiesring"}></Section>
    </>
  );
}

export default Ladiesrings;
