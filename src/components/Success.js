import React from 'react'

const Success = ({ siparis }) => {
    return (
        <div className='success-Container' style={{

        }} ><h4 style={{ textAlign: "center", padding: "3% 0 0 0", }}>Siparişiniz Başarıyla Bize Ulaştı.</h4>
            <ul style={{
                textAlign: "center", padding: "2% 0 0 0", display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <ul ><h4>Merhaba
                    <span style={{ color: "#CE2829" }}> {siparis.isim}!</span>
                </h4></ul>
                <br></br>
                <ul><h5 >Siparişinizin Detayları:</h5></ul>
                <br></br>
                <ul><h6>Pizzanızın Boyutu:</h6></ul>
                <ul> {siparis.boy}</ul>
                <br></br>
                <ul><h6>Sos Tercihi:</h6></ul>
                <ul>{siparis.sos}</ul>
                <br></br>

                {siparis.malzemeler[0] ?
                    <><ul><h6>Ek Malzeme Tercihleriniz:</h6></ul>
                        <ul>{siparis.malzemeler.join(", ")} </ul>
                        <br></br></>
                    : <><ul><h6>Ek Malzeme Tercihleriniz:</h6></ul>
                        <ul>Bulunmamaktadır</ul>
                        <br></br></>}

                <ul><h6>Sipariş Notunuz:</h6>
                    <p>{siparis.not}</p>
                    <br />
                    <br />
                </ul>
                <img style={{ width: "30%", }} src={require('../assets/kart-3.png')} />
            </ul>
        </div>
    )
}

export default Success