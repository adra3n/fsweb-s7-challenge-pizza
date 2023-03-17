import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div>
      <nav className="nav-Container">
        <h1>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
            Teknolojik Yemekler
          </Link>
        </h1>
      </nav>
    </div>
  )
}

export default Header
