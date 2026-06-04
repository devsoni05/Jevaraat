import "./App.css";
import Home from "./Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Home/Nav";
import Footer from "./Home/Footer";
import Inventory from "./Inventory/Inventory";
import Appointments from "./Appointments/Appointments";
import Orders from "./Orders/Orders";
import Payments from "./Payments/Payments";
import Customer from "./Customer/Customer";
import Mensrings from "./Inventory/Mensrings";
import Ladiesrings from "./Inventory/Ladiesrings";
import Necklaces from "./Inventory/Necklaces";
import Goldbar from "./Inventory/Goldbar";
import Createitem from "./Inventory/Createitem";
import Updateitem from "./Inventory/Updateitem";
import Signin from "./auth/Signin";
import ProtectedRoute from "./auth/ProtectedRoute";
import { getAdminToken } from "./auth/storage";
import Profile from "./Profile/Profile";

function App() {
  const location = useLocation();
  const isAuthenticated = Boolean(getAdminToken());
  const hideLayout = location.pathname === "/signin" || !isAuthenticated;

  return (
    <>
      {!hideLayout && <Nav />}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Mensrings" element={<Mensrings />} />
          <Route path="/Ladiesrings" element={<Ladiesrings />} />
          <Route path="/Necklaces" element={<Necklaces />} />
          <Route path="/Goldbars" element={<Goldbar />} />
          <Route path="/Createitem" element={<Createitem />} />
          <Route path="/Updateitem" element={<Updateitem />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
