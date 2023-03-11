import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import OrderForm from "./components/Form";
import AnaSayfa from './AnaSayfa';
const App = () => {

  return (
    <div >
      <h1 style={{ textAlign: "center", margin: "2%", backgroundColor: "#CE2829", color: "white" }}>Teknolojik Yemekler</h1>

      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/pizza" element={<OrderForm />} />
      </Routes>
    </div>
  );
};
export default App;
