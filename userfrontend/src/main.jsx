import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AiAssistant from "./components/assistant/AiAssistant";
import Nav from "./components/home/Nav";
import Footer from "./components/home/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Nav></Nav>
      <App />
      <AiAssistant />
      <Footer></Footer>
    </Router>
  </React.StrictMode>,
);
