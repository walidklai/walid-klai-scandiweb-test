import React, { Component } from "react";
import Mainpage from "./components/Mainpage/Mainpage";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router";
import Productpage from "./components/Productpage/Productpage";
import Cartpage from "./components/Cartpage/Cartpage";

export default class App extends Component {
 
  render() {
    return (
      <div>
        <Navbar />
        <div className="app_container">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/:id" element={<Productpage />} />
            <Route path="/cart" element={<Cartpage />} />
          </Routes>
        </div>
      </div>
    );
  }
}