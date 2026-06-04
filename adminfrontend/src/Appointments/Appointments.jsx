import Appointmentdata from "./Appointmentdata";
import { useState, useEffect } from "react";
import axios from "axios";
function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/read/appointment")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container mt-5 p-5">
        <Appointmentdata appointments={appointments}></Appointmentdata>
      </div>
    </>
  );
}

export default Appointments;
