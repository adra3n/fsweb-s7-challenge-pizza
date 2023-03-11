import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import "./AnaSayfa.css";

const AnaSayfa = () => {
    return (
        <div className='anasayfa-Container'>
            <img className="main-Banner" src={require("./assets/food-2.png")} style={{ maxWidth: "50vw", maxHeight: "50vh" }} />
            <Button size="lg" style={{ width: "10vw", padding: "2%", backgroundColor: "#FDC913", border: "0px", margin: " 2vh 0 5vh 0", display: "flex", justifyContent: "center", padding: "0 2vw 0 2vw" }}>
                <Link style={{ textDecoration: "none", color: "#292929", backgroundColor: "#FDC913", padding: "0 2vw 0 2vw" }} to={"/pizza"}>Sipariş Ver</Link>
            </Button>
            <br></br>
            <br></br>
        </div>
    )
}

export default AnaSayfa