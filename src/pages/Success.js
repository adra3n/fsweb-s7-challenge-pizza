import React from 'react'
import './Success.css'

const Success = ({ siparis }) => {
  return (
    <div className="success-Container" style={{}}>
      <h4 style={{ textAlign: 'center', paddingTop: '3%' }}>
        Siparişiniz Başarıyla Bize Ulaştı.
      </h4>
      <div className="siparis-container">
        <h4>
          Merhaba
          <span style={{ color: '#CE2829' }}> {siparis.isim}!</span>
        </h4>
        <br></br>
        <h5>Siparişinizin Detayları:</h5>
        <br></br>
        <h6>Pizzanızın Boyutu:</h6>
        <p> {siparis.boy}</p>
        <br></br>
        <h6>Hamur Tercihi:</h6>
        <p>{siparis.hamur}</p>
        <br></br>
        {siparis.malzemeler[0] ? (
          <>
            <h6>Ek Malzeme Tercihleriniz:</h6>

            <p>{siparis.malzemeler.join(', ')} </p>
            <br></br>
          </>
        ) : (
          <>
            <h6>Ek Malzeme Tercihleriniz:</h6>

            <p>Bulunmamaktadır.</p>
            <br></br>
          </>
        )}
        <h6>Ekstra Hızlı Servis:</h6>
        {siparis.hizli ? <p>İstenmedi</p> : <p>İstendi</p>}
        <br />
        <br />
        <h6>Sipariş Notunuz:</h6>
        <p>{siparis.not}</p>
        <br />
        <br />
        <div>
          <h5 style={{ color: '#CE2829' }}>Fiyatı: {siparis.fiyat}</h5>
        </div>
        <hr></hr>
        <img style={{ width: '30%' }} src={require('../assets/kart-3.png')} />
      </div>
    </div>
  )
}

export default Success
