import React, { useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import Form from "./components/Form";
import AnaSayfa from './AnaSayfa';
import Success from './components/Success';

const App = () => {

  const [siparis, setSiparis] = useState({});

  const siparisSonucu = (e) => {
    setSiparis(e);
    console.log(siparis);
  }



  return (
    <div className='main-Container' >

      <nav className='nav-Container' style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "15vh",
        margin: "0",
        backgroundColor: "#CE2829"
      }}>
        <h1 >
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>Teknolojik Yemekler</Link>
        </h1>

      </nav>

      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/pizza" element={<Form siparisSonucu={siparisSonucu} />} />
        <Route path="/success" element={<Success siparis={siparis} />} />
      </Routes>

    </div>
  );
};
export default App;
