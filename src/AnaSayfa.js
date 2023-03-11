import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import "./AnaSayfa.css";

const AnaSayfa = () => {
    return (
        <div className='anasayfa-Container'>

            <Button size="lg" style={{ width: "10vw", padding: "1%", backgroundColor: "#FDC913", border: "0px" }}>
                <Link style={{ textDecoration: "none", color: "#292929", backgroundColor: "#FDC913" }} to={"/pizza"}>Sipariş Ver!</Link>
            </Button>
            <img src='../Assets/banner.png' />
        </div>
    )
}

export default AnaSayfa