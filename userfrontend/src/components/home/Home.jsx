import Nav from "./Nav";
import Imagecrousel from "./Imagecrousel";
import Section from "./Section";
import Goldbarleft from "./Goldbarleft";
import Goldbarright from "./Goldbarright";
import Review from "./Review";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState(
    location.state?.alertMessage || "",
  );
  const [ring, setRings] = useState([]);

  useEffect(() => {
    axios
      .get("https://jevaraat.onrender.com/read/ring")
      .then((res) => {
        setRings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [ladrings, setladRings] = useState([]);

  useEffect(() => {
    axios
      .get("https://jevaraat.onrender.com/ladiesring")
      .then((res) => {
        setladRings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [necklace, setnecklace] = useState([]);

  useEffect(() => {
    axios
      .get("https://jevaraat.onrender.com/read/necklace")
      .then((res) => {
        setnecklace(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      {alertMessage && (
        <div className="container mt-5 pt-5">
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setAlertMessage("")}
            ></button>
          </div>
        </div>
      )}
      <Imagecrousel></Imagecrousel>
      <Section rings={ring} heading={"MENS RINGS"} url={"/Allitems"}></Section>
      <Section
        rings={ladrings}
        heading={"LADIES RINGS"}
        url={"/Allitemswomenrings"}
      ></Section>
      <Section
        rings={necklace}
        heading={"NACKLACES"}
        url={"/Allitemnecklace"}
      ></Section>
      <div className="container">
        <br />
        <br />
        <h3 className=" mt-5">
          GOLD COINS & BARS (best for investment purposes){" "}
        </h3>
        {goldbar.map((item, index) =>
          index % 2 === 0 ? (
            <Goldbarleft key={item._id} item={item} />
          ) : (
            <Goldbarright key={item._id} item={item} />
          ),
        )}
        <Review></Review>
      </div>
    </>
  );
}

export default Home;
