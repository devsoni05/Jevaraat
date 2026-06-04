import Section from "./Section";

import { useEffect, useState } from "react";
import axios from "axios";

function Mensrings() {
  const [ring, setRings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/read/ring")
      .then((res) => {
        setRings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Section item={ring} heading={"ring"}></Section>
    </>
  );
}

export default Mensrings;
