import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RestaurantsOverview } from "./pages/RestaurantsOverview";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <p>Restaurants rating site</p>
      </header>

      <Routes>
        <Route path="/" element={<RestaurantsOverview />} />
      </Routes>
    </div>
  );
}

export default App;
