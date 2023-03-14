import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav
        className="nav-Container"
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '15vh',
          margin: '0',
          backgroundColor: '#CE2829',
        }}
      >
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
