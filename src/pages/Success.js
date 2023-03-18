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

        <h6>Siparişinizin Detayları:</h6>

        <div className="success-row">
          <p>Boyut:</p>
          <p>
            <b>{siparis.boy}</b>
          </p>
        </div>
        <div className="success-row">
          <p>Hamur Tercihi:</p>
          <p>
            <b>{siparis.hamur}</b>
          </p>
        </div>
        <div className="success-row">
          <p>Hamur Tercihi:</p>
          <p>
            <b>{siparis.hamur}</b>
          </p>
        </div>

        {siparis.malzemeler[0] ? (
          <div className="success-row">
            <p>Ek Malzemeler:</p>

            <p>
              <b>{siparis.malzemeler.join(', ')} </b>
            </p>
          </div>
        ) : (
          <div className="success-row">
            <p>Ek Malzemeler:</p>

            <p>
              <b>Bulunmamaktadır.</b>
            </p>
          </div>
        )}
        <div className="success-row">
          {' '}
          <p>Ekstra Hızlı Servis:</p>
          {siparis.hizli ? (
            <p>
              <b>İstendi</b>
            </p>
          ) : (
            <p>
              <b>İstenmedi</b>
            </p>
          )}
        </div>
        <div className="success-row">
          <p>Sipariş Notunuz:</p>
          {siparis.not ? (
            <p>
              <b>{siparis.not}</b>
            </p>
          ) : (
            <p>
              <b>Bulunmamaktadır.</b>
            </p>
          )}
        </div>

        <div id="fiyat-container">
          <h6
            style={{
              textAlign: 'justify',
              display: 'flex',
              flexFlow: 'row',
            }}
          >
            Sipariş Toplamı
          </h6>
          <div className="fiyat-row">
            <p>Seçimler:</p>
            <p> {siparis.malzemeler.length * 5}₺</p>{' '}
          </div>
          <div className="fiyat-row" style={{ color: '#FDC913' }}>
            <p>Toplam: </p>
            <p>{siparis.fiyat}₺</p>
          </div>
        </div>
        <hr></hr>
        {/* <img style={{ width: '30%' }} src={require('../assets/kart-3.png')} /> */}
      </div>
    </div>
  )
}

export default Success
