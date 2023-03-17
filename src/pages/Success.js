import React from 'react'
import './Success.css'

const Success = ({ siparis }) => {
  return (
    <div className="success-Container" style={{ paddingTop: '2%' }}>
      <h4
        style={{ fontFamily: 'Satisfy', textAlign: 'center', color: '#FDC913' }}
      >
        lezzetin yolda
      </h4>
      <h1
        style={{
          textAlign: 'center',
          background: '#CE2829',
          fontFamily: 'Barlow',
          color: 'white',
        }}
      >
        SİPARİŞ ALINDI.
      </h1>
      <hr style={{ color: 'white' }}></hr>
      <div className="siparis-container">
        <h4>
          Merhaba
          <span style={{ color: '#FDC913' }}> {siparis.isim}!</span>
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
          </>
        )}
        <h6>Ekstra Hızlı Servis:</h6>
        {siparis.hizli ? <p>İstenmedi</p> : <p>İstendi</p>}

        <h6>Sipariş Notunuz:</h6>
        {siparis.malzemeler[0] ? <p>{siparis.not}</p> : <p>Bulunmamaktadır.</p>}

        <div className="fiyat-container">
          <h5
            style={{
              textAlign: 'justify',
              display: 'flex',
              flexFlow: 'row',
            }}
          >
            Sipariş Toplamı
          </h5>
          <div className="fiyat-row">
            <h6>Seçimler:</h6>
            <h6> {siparis.malzemeler.length * 5}₺</h6>{' '}
          </div>
          <div className="fiyat-row" style={{ color: '#FDC913' }}>
            <h6>Fiyatı: </h6>
            <h6>{siparis.fiyat}₺</h6>
          </div>
        </div>
        <hr></hr>
        {/* <img style={{ width: '30%' }} src={require('../assets/kart-3.png')} /> */}
      </div>
    </div>
  )
}

export default Success
