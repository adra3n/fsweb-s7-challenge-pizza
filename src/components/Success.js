import React from 'react'

const Success = ({ siparis }) => {
    return (
        <div className='success-Container' style={{

        }} ><h4 style={{ textAlign: "center", padding: "3% 0 0 0", }}>Siparişiniz Başarıyla Bize Ulaştı.</h4>
            <ul style={{
                textAlign: "center", padding: "3% 0 0 0", display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <ul ><h4>Merhaba {siparis.isim}!</h4></ul>
                <br></br>
                <ul><h5>Siparişinizin Detayları</h5></ul>
                <ul>Pizzanızın Boyutu: {siparis.size}</ul>
                <ul>Sosu: {siparis.sos}</ul>
                <br></br>
                <ul><h6>Ek Malzeme Tercihleriniz</h6></ul>
                <ul>Pepperoni: {siparis.pepperoni}</ul>
                <ul>Mısır: {siparis.misir}</ul>
                <ul>Domates: {siparis.domates}</ul>
                <ul>Sarımsak: {siparis.sarimsak}</ul>
                <ul>Soğan: {siparis.sogan}</ul>
                <ul>Biber: {siparis.biber}</ul>
                <br></br>
                <ul><h5>Sipariş Notun: {siparis.not}</h5>
                    <br />
                    <br />
                </ul>
                <img style={{ width: "30%", }} src={require('../assets/kart-3.png')} />
            </ul>
        </div>
    )
}

export default Success