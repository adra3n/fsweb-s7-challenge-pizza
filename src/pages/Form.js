import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  Form,
  Input,
  Label,
  Button,
  Row,
  Col,
  FormFeedback,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import './Form.css'

const OrderForm = ({ siparisSonucu }) => {
  const [siparisDetayi, setSiparisDetayi] = useState({
    isim: '',
    boy: '',
    hamur: '',
    malzemeler: [],
    adet: '',
    not: '',
    fiyat: 70,
    hizli: false,
  })

  const [formErrors, setFormErrors] = useState({
    isim: '',
    boy: '',
    hamur: '',
    malzemeler: '',
  })

  const [disableButton, setDisableButton] = useState(true)
  const [baslangicFiyati, setBaslangicFiyati] = useState(70)

  const toppings = [
    'Sosis',
    'Jambon',
    'Mantar',
    'Biber',
    'Zeytin',
    'Sucuk',
    `Ananas`,
    `Jalapeno`,
    `Soğan`,
    `Domates`,
    `Mısır`,
    `Sarımsak`,
  ]

  const formSchema = Yup.object().shape({
    isim: Yup.string()
      .required('İsim alanı zorunlu')
      .min(2, 'En az 2 harf olmalı'),
    boy: Yup.string().required('Pizza boyunuzu seçmeniz gerekiyor.'),
    hamur: Yup.string().required('Hamur tipi seçmeniz gerekiyor.'),
    malzemeler: Yup.array().max(10, 'En fazla 10 malzeme seçebilirsiniz.'),
    not: Yup.string(),
  })

  const navigate = useNavigate()

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (e.target.type === 'checkbox') {
      if (siparisDetayi.malzemeler.includes(value)) {
        setSiparisDetayi({
          ...siparisDetayi,
          malzemeler: siparisDetayi.malzemeler.filter((i) => i !== value),
        })
      } else {
        setSiparisDetayi({
          ...siparisDetayi,
          malzemeler: [...siparisDetayi.malzemeler, value],
        })
      }
    } else {
      Yup.reach(formSchema, name)
        .validate(value)
        .then(() => {
          setFormErrors({ ...formErrors, [name]: '' })
        })
        .catch((err) => {
          setFormErrors({ ...formErrors, [name]: err.errors[0] })
        })

      setSiparisDetayi({ ...siparisDetayi, [name]: value })

      if (e.target.value === 'Orta') {
        setBaslangicFiyati(90)
      }
      if (e.target.value === 'Büyük') {
        setBaslangicFiyati(110)
      }
      if (e.target.value === 'Küçük') {
        setBaslangicFiyati(70)
      }
    }
  }
  const hizliHandler = (e) => {
    setSiparisDetayi({ ...siparisDetayi, hizli: e.target.checked })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    siparisSonucu(siparisDetayi)
    navigate('/success')
    axios
      .post('https://reqres.in/api/orders', siparisDetayi)
      .then((res) => {
        console.log('axios post>', res.data)
        // siparisSonucu(res.data)
      })
      .catch((err) => {
        console.log('axios err>', err)
      })
  }

  useEffect(() => {
    Yup.reach(formSchema, 'malzemeler')
      .validate(siparisDetayi.malzemeler)
      .then(() => setFormErrors({ ...formErrors, malzemeler: '' }))
      .catch((err) =>
        setFormErrors({ ...formErrors, malzemeler: err.errors[0] })
      )
  }, [siparisDetayi.malzemeler])

  useEffect(() => {
    formSchema.isValid(siparisDetayi).then((valid) => {
      setDisableButton(!valid)
    })
    // console.log('siparis detayi >', siparisDetayi)
    console.log('siparisDetayi >', siparisDetayi)
  }, [siparisDetayi])

  useEffect(() => {
    console.log('form error >', formErrors)
  }, [formErrors])

  useEffect(() => {
    setSiparisDetayi({
      ...siparisDetayi,
      fiyat: baslangicFiyati + 5 * siparisDetayi.malzemeler.length,
    })
  }, [siparisDetayi.boy, siparisDetayi.malzemeler])

  return (
    <div className="form-container">
      <img id="esnek-banner" src={require('../assets/esnek-form-banner.png')} />
      <h5 style={{ paddingTop: '1%' }}>Pizza Sipariş Formu</h5>

      <Form id="pizza-form" onSubmit={submitHandler}>
        <FormGroup style={{ textAlign: 'center', margin: '1rem 0 1rem 0' }}>
          <Label for="isim">
            {/* htmlFor diye düzenlenecek */}
            <h6>İsminiz</h6>
          </Label>
          <Input
            invalid={Boolean(formErrors.isim)}
            type="text"
            name="isim"
            id="name-input"
            data-cy="name-input"
            onChange={changeHandler}
            placeholder="İsminizi Giriniz"
          />
          <FormFeedback>{formErrors.isim}</FormFeedback>
          <hr />
        </FormGroup>
        <h5>Pizzanızın detaylarını seçiniz!</h5>
        <br></br>
        <Row
          style={{
            textAlign: 'justify',
          }}
        >
          {' '}
          <Col md={6}>
            <h6>Boy Seçiniz</h6>
            <FormGroup
              tag="fieldset"
              style={{
                textAlign: 'justify',
                display: 'flex',
                flexDirection: 'column',
                width: '10vw',
              }}
            >
              <Row
                style={{
                  textAlign: 'justify',
                }}
              >
                <Col md={4}>
                  <FormGroup check>
                    <Input
                      name="boy"
                      type="radio"
                      value="Küçük"
                      invalid={Boolean(formErrors.boy)}
                      onChange={changeHandler}
                    />{' '}
                    <Label check>Küçük</Label>
                    <FormFeedback>{formErrors.boy}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup check>
                    <Input
                      name="boy"
                      type="radio"
                      value="Orta"
                      onChange={changeHandler}
                      invalid={Boolean(formErrors.boy)}
                    />{' '}
                    <Label check>Orta</Label>
                    <FormFeedback>{formErrors.boy}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup check>
                    <Input
                      name="boy"
                      type="radio"
                      value="Büyük"
                      onChange={changeHandler}
                      invalid={Boolean(formErrors.boy)}
                    />{' '}
                    <Label check>Büyük</Label>
                    <FormFeedback>{formErrors.boy}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={6}>
            <h6>Hamur Tipi</h6>
            <FormGroup className="dropdown-group">
              <Input
                id="size-dropdown"
                name="hamur"
                type="select"
                onChange={changeHandler}
                invalid={Boolean(formErrors.hamur)}
                value={siparisDetayi.hamur}
                data-cy="size-dropdown"
              >
                <option value="" disabled hidden>
                  Hamur Tipi
                </option>
                <option value="İnce">İnce</option>
                <option value="Kalın">Kalın</option>
              </Input>
              <FormFeedback>{formErrors.hamur}</FormFeedback>
            </FormGroup>{' '}
            <br></br>
          </Col>
        </Row>

        <FormGroup>
          <Label
            className="toppings-label"
            for="toppings"
            style={{ justifyContent: 'flex-start', textAlign: 'justify' }}
          >
            <h6>Ek Malzemeler</h6>
            <p>
              <i>Her ek malzeme 5 TL</i>
            </p>
          </Label>

          <div className="toppings-div">
            {toppings.map((e, i) => (
              <FormGroup check key={e} style={{ flex: '0 0 32%' }}>
                <Label check>
                  <Input
                    className="toppings-check"
                    // style={{ backgroundColor: '#FDC913', border: '0' }}
                    data-cy={`checkbox${i}`}
                    type="checkbox"
                    name="malzemeler"
                    value={e}
                    onChange={changeHandler}
                    invalid={Boolean(formErrors.malzemeler[0])}
                  />
                  {e}
                </Label>
              </FormGroup>
            ))}
          </div>
          <div>
            {formErrors.malzemeler && (
              <p style={{ color: 'red' }}>{formErrors.malzemeler}</p>
            )}
          </div>
          <br />
        </FormGroup>

        <FormGroup className="special-note">
          <Label
            for="not"
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <h6>Sipariş Notunuzu Giriniz</h6>
          </Label>
          <Input
            style={{ height: '4rem' }}
            type="text"
            name="not"
            id="special-text"
            data-cy="special-text"
            placeholder="
            Sipariş Notu"
            onChange={changeHandler}
          />
        </FormGroup>
        <hr></hr>

        <div className="bottom-container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="counter-container">
              <Button
                style={{
                  backgroundColor: '#faf7f2',
                  color: '#292929',
                  border: '0',
                }}
              >
                -
              </Button>
              <h5 style={{ marginBottom: '0' }}> 1 </h5>
              <Button
                style={{
                  backgroundColor: '#faf7f2',
                  color: '#292929',
                  border: '0',
                }}
              >
                +
              </Button>
            </div>
            <FormGroup check style={{ marginTop: '2rem', textAlign: 'start' }}>
              <Label check>
                <Input
                  type="checkbox"
                  name="hizli"
                  onChange={hizliHandler}
                  invalid={Boolean(formErrors.hizli)}
                />
                Ekstra Hızlı
              </Label>
            </FormGroup>
          </div>
          <div className="toplam-container">
            <p>
              <i>Ek Malzeme Sayısı: {siparisDetayi.malzemeler.length}</i>
            </p>
            <p>
              <i>Seçimler: {siparisDetayi.malzemeler.length * 5}₺</i>
            </p>
            <h5 style={{ color: '#CE2829' }}>Toplam: {siparisDetayi.fiyat}₺</h5>{' '}
            <Button
              disabled={disableButton}
              id="order-button"
              data-cy="order-button"
            >
              Sipariş Ver
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default OrderForm

//checkbox
//siparisDetayi icine ekstrahizli
//handler düzenle
//submit ile success e gönder

//
