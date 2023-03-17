import React from 'react'
import { Link } from 'react-router-dom'

import './AnaSayfa.css'

const AnaSayfa = () => {
  return (
    <div className="anasayfa-Container">
      <img className="main-banner" src={require('../assets/food-2.png')} />
      <Link id="order-pizza" to="/pizza" data-cy="order-pizza">
        Sipariş Ver
      </Link>
      <br></br>
    </div>
  )
}

export default AnaSayfa
