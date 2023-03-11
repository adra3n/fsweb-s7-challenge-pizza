import React from 'react'

const Success = ({ siparis }) => {
    return (
        <div><h1 style={{ textAlign: "center", padding: "3% 0 0 0" }}>Siparişiniz Başarıyla Bize Ulaştı.</h1>
            <ul style={{ textAlign: "center", padding: "3% 0 0 0" }}>
                <ul>Merhaba {siparis.isim}!</ul>
                <br></br>
                <ul><h3>Siparişinizin Detayları</h3></ul>
                <ul>Pizzanızın Boyutu: {siparis.size}</ul>
                <ul>Sosu: {siparis.sos}</ul>
                <ul>Pepperoni: {siparis.pepperoni}</ul>
                <ul>Mısır: {siparis.misir}</ul>
                <ul>Domates: {siparis.domates}</ul>
                <ul>Sarımsak: {siparis.sarimsak}</ul>
                <ul>Soğan: {siparis.sogan}</ul>
                <ul>Biber: {siparis.biber}</ul>
                <br></br>
                <ul><h5>Sipariş Notun:{siparis.not}</h5></ul>

            </ul></div>
    )
}

export default Success