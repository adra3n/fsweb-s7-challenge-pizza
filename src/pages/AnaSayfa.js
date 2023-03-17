import React from 'react'
import { Link } from 'react-router-dom'

import './AnaSayfa.css'

const AnaSayfa = () => {
  return (
    <div className="anasayfa-Container">
      {/* <img className="main-banner" src={require('../assets/food-2.png')} /> */}
      <div className="header-anasayfa">
        <h4>fırsatı kaçırma</h4>
        <h2>KOD ACIKTIRIR.</h2>
        <h2>PİZZA, DOYURUR.</h2>
      </div>
      <Link id="order-pizza" to="/pizza" data-cy="order-pizza">
        ACIKTIM
      </Link>
      <br></br>
    </div>
  )
}

export default AnaSayfa
