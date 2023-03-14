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

  const [siparisDetayi, setSiparisDetayi] = useState({
    boy: '',
    sos: '',
    malzemeler: [],
    adet: '',
    not: '',
    fiyat: '',
  })

  const [formErrors, setFormErrors] = useState({
    isim: '',
    boy: '',
    sos: '',
    malzemeler: '',
    not: '',
  })

  const formSchema = Yup.object().shape({
    isim: Yup.string()
      .required('İsim alanı zorunlu')
      .min(2, 'En az 2 harf olmalı'),
    boy: Yup.string().required('Pizza boyunuzu seçmeniz gerekiyor.'),
    sos: Yup.string().required('Pizza sosu seçmeniz gerekiyor.'),
    malzemeler: Yup.array().max(10, 'En fazla 10 malzeme seçebilirsiniz.'),
    not: Yup.string(),
  })

  const [disableButton, setDisableButton] = useState(true)

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
    }
  }

  useEffect(() => {
    Yup.reach(formSchema, 'malzemeler')
      .validate(siparisDetayi.malzemeler)
      .then(() => setFormErrors({ ...formErrors, malzemeler: '' }))
      .catch((err) =>
        setFormErrors({ ...formErrors, malzemeler: err.errors[0] })
      )

    const toppingsFiyati = 150 + 5 * siparisDetayi.malzemeler.length
    setSiparisDetayi({ ...siparisDetayi, fiyat: toppingsFiyati })
  }, [siparisDetayi.malzemeler])

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    siparisSonucu(siparisDetayi)
    navigate('/success')
    axios.post('https://reqres.in/api/orders', siparisDetayi).then((res) => {
      console.log('axios post>', res.data)
    })
  }

  useEffect(() => {
    formSchema.isValid(siparisDetayi).then((valid) => {
      setDisableButton(!valid)
    })

    console.log('siparis detayi >', siparisDetayi)
  }, [siparisDetayi])

  useEffect(() => {
    console.log('form error >', formErrors)
  }, [formErrors])

  return (
    <div className="form-Container">
      <img
        src={require('../assets/esnek-form-banner.png')}
        style={{ width: '18%' }}
      />
      <h5 style={{ paddingTop: '1%' }}>Pizza Sipariş Formu</h5>

      <Form id="pizza-form" onSubmit={submitHandler}>
        <FormGroup style={{ textAlign: 'center', margin: '1rem 0 1rem 0' }}>
          <Label for="isim">
            <h6>İsminiz</h6>
          </Label>
          <Input
            invalid={Boolean(formErrors.isim)}
            type="text"
            name="isim"
            id="name-input"
            onChange={changeHandler}
          />
          <FormFeedback>{formErrors.isim}</FormFeedback>
          <hr />
        </FormGroup>
        <h5>Pizzanızın detaylarını seçiniz!</h5>
        <Row
          style={{
            textAlign: 'justify',
          }}
        >
          <Col md={6}>
            <FormGroup style={{ width: '30vw', textAlign: 'center' }}>
              <br />
              <h6>Pizza Boyu</h6>
              <Input
                id="size-dropdown"
                name="boy"
                type="select"
                onChange={changeHandler}
                invalid={Boolean(formErrors.boy)}
                value={siparisDetayi.boy}
              >
                <option value="" disabled hidden>
                  Boy Seçiniz
                </option>
                <option value="Küçük">Küçük</option>
                <option value="Orta">Orta</option>
                <option value="Büyük">Büyük</option>
                <option value="XL">XL</option>
              </Input>
              <FormFeedback>{formErrors.boy}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <h6>Sosunuzu Seçiniz</h6>
        <FormGroup
          tag="fieldset"
          style={{
            textAlign: 'justify',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Row
            style={{
              textAlign: 'justify',
            }}
          >
            <Col md={6}>
              <FormGroup check>
                <Input
                  name="sos"
                  type="radio"
                  value="Original Red"
                  invalid={Boolean(formErrors.sos)}
                  onChange={changeHandler}
                />{' '}
                <Label check>Original Red</Label>
                <FormFeedback>{formErrors.sos}</FormFeedback>
              </FormGroup>

              <FormGroup check>
                <Input
                  name="sos"
                  type="radio"
                  value="Garlic Ranc"
                  onChange={changeHandler}
                  invalid={Boolean(formErrors.sos)}
                />{' '}
                <Label check>Garlic Ranch</Label>
                <FormFeedback>{formErrors.sos}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup check>
                <Input
                  name="sos"
                  type="radio"
                  value="BBQ Sauce"
                  onChange={changeHandler}
                  invalid={Boolean(formErrors.sos)}
                />{' '}
                <Label check>BBQ Sauce</Label>
                <FormFeedback>{formErrors.sos}</FormFeedback>
              </FormGroup>

              <FormGroup check>
                <Input
                  name="sos"
                  type="radio"
                  value="Spinach Alfredo"
                  onChange={changeHandler}
                  invalid={Boolean(formErrors.sos)}
                />{' '}
                <Label check>Spinach Alfredo</Label>
                <FormFeedback>{formErrors.sos}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Label for="toppings">
            <h6>Ekstra Malzemeler</h6>
            <p>
              <i>Her malzeme 5 TL</i>
            </p>
          </Label>

          <div
            style={{
              width: '30vw',
              textAlign: 'justify',
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'space-between',
            }}
          >
            {toppings.map((e) => (
              <FormGroup check style={{ flex: '0 0 32%' }} key={e}>
                <Label check>
                  <Input
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
            {formErrors.malzemeler && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {formErrors.malzemeler}
              </p>
            )}
          </div>
        </FormGroup>

        <FormGroup style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
          <Label for="not">
            <h6>Sipariş Notunuzu Giriniz</h6>
          </Label>
          <Input
            type="text"
            name="not"
            id="special-text"
            onChange={changeHandler}
          />
        </FormGroup>

        <Button
          disabled={disableButton}
          id="order-button"
          style={{
            color: '#292929',
            backgroundColor: '#FDC913',
            border: '0',
            padding: '3%',
            margin: '1rem 0',
            borderRadius: '1rem',
          }}
        >
          Sipariş Ver
        </Button>
      </Form>

      <div>
        <h5>Fiyat: {siparisDetayi.fiyat}</h5>
        <p>Ek Malzeme Sayısı:{siparisDetayi.malzemeler.length}</p>
      </div>
    </div>
  )
}

export default OrderForm
