import { Routes, Route } from "react-router-dom";
import Signin from "./components/signup/Signin";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Appointment from "./components/appointment/Appointment";
import Contact from "./components/about/Contact";
import Form from "./components/loan/Form";
import Value from "./components/loan/Value";
import Allitems from "./components/home/Allitems";
import Goldprice from "./components/goldprice/Goldprice";
import Allitemswomenrings from "./components/home/Allitemswomenring";
import Allitemnecklace from "./components/home/Allitemnecklace";
import Profile from "./components/profile/profile";
import Cart from "./components/cart/Cart";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Value" element={<Value />} />
      <Route path="/Allitems" element={<Allitems />} />
      <Route path="/Allitemswomenrings" element={<Allitemswomenrings />} />
      <Route path="/Goldprice" element={<Goldprice />} />
      <Route path="/Allitemnecklace" element={<Allitemnecklace />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
