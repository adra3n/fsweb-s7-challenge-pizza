import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

import "./AnaSayfa.css";

const AnaSayfa = () => {
    const navigate = useNavigate()
    return (
        <div className='anasayfa-Container'>
            <img className="main-Banner" src={require("./assets/food-2.png")} style={{ maxWidth: "50vw", maxHeight: "50vh" }} />
            <Link id="order-pizza" onClick={navigate("/pizza")} style={{ borderRadius: "5rem", color: "#292929", textDecoration: "none", width: "10rem", backgroundColor: "#FDC913", border: "0.15rem white solid", padding: "1rem 2rem", margin: " 3vh 0 10vh 0", display: "flex", justifyContent: "center" }}>
                {/* <Link style={{ textDecoration: "none", , backgroundColor: "#FDC913", padding: "0 2vw 0 2vw" }} > */}
                Sipariş Ver
                {/* </Link> */}
            </Link>
            <br></br>
            <br></br>
        </div>
    )
}

export default AnaSayfa