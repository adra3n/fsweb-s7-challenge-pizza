import React, { useState, useEffect } from 'react'
import { FormGroup, Form, Input, Label, Button, Row, Col } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import "./Form.css";

const OrderForm = ({ siparisSonucu }) => {

    const [siparisDetayi, setSiparisDetayi] = useState({
        size: "",
        sos: "",
        pepperoni: "Yok",
        misir: "Yok",
        domates: "Yok",
        sarimsak: "Yok",
        sogan: "Yok",
        biber: "Yok",
        not: "",
    });

    const [formErrors, setFormErrors] = useState({
        isim: "",
        size: "",
        sos: "",
        // pepperoni: "",
        // misir: "",
        // domates: "",
        // sarimsak: "",
        // sogan: "",
        // biber: "",
        not: "",
        // malzeme: "En fazla 5 malzeme seçebilirsiniz."
    });
    const formSchema = Yup.object().shape({
        isim: Yup
            .string()
            .required("İsim alanı zorunlu")
            .min(2, "En az 2 harf olmalı"),
        size: Yup.string().required("Pizza boyunuzu seçmeniz gerekiyor."),
        sos: Yup.string().required("Pizza sosu seçmeniz gerekiyor."),
        // pepperoni: Yup.string(),
        // misir: Yup.string(),
        // domates: Yup.string(),
        // sarimsak: Yup.string(),
        // sogan: Yup.string(),
        // biber: Yup.string(),
        not: Yup.string(),

        // Yup.object({ checked: Yup.array().min(1, 'Select atleast one option of your interest') });
        // toppings: yup.array().max(5).of(yup.string().required()).required(),
        // required isn't required for checkboxes.
    });

    const [disableButton, setDisableButton] = useState(true);

    const navigate = useNavigate();

    const changeHandler = (e) => {

        Yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setFormErrors({ ...formErrors, [e.target.name]: "" })
            })
            .catch(err => {
                setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] })
            })

        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: e.target.value });
    };

    const clickHandler = (e) => {
        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: e.target.id });
    };


    const checkHandler = (e) => {
        if (e.target.checked === true) {
            setSiparisDetayi({ ...siparisDetayi, [e.target.name]: "Var" });
        }
        else {
            setSiparisDetayi({ ...siparisDetayi, [e.target.name]: "Yok" })
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        siparisSonucu(siparisDetayi);
        console.log(siparisDetayi);
        navigate("/success");
        axios.post("https://reqres.in/api/orders", siparisDetayi)
            .then((res) => { console.log("axios post>", res.data) })
    };

    useEffect(() => {
        console.log("siparis detayi >", siparisDetayi);
        formSchema.isValid(siparisDetayi).then(valid => { setDisableButton(!valid) });
    }, [siparisDetayi]);

    useEffect(() => {
        console.log("form error >", formErrors)
    }, [formErrors]);

    return (
        <div className='form-Container'>
            <img src={require('../assets/esnek-form-banner.png')} style={{ width: "18%" }} />
            <h5 style={{ paddingTop: "1%" }}>Pizza Sipariş Formu</h5>

            <Form id="pizza-form" onSubmit={submitHandler}>
                <FormGroup style={{ textAlign: "center", margin: "1rem 0 1rem 0" }}>

                    <Label for="isim" >
                        <h6 >İsminiz</h6>

                    </Label>
                    <Input type="text" name="isim" id="name-input" onChange={changeHandler} />

                    <hr />
                </FormGroup>
                <h5>Pizzanızın detaylarını seçiniz!</h5>
                <FormGroup >
                    <br />

                    <h6>Pizza Boyu</h6>
                    <Input
                        id="size-dropdown"
                        name="size"
                        type="select"
                        value={siparisDetayi.size}
                        onChange={changeHandler}
                    >
                        <option>
                            Küçük
                        </option>
                        <option>
                            Orta
                        </option>
                        <option>
                            Büyük
                        </option>
                        <option>
                            XL
                        </option>
                    </Input>
                </FormGroup>
                <h6>Sosunuzu Seçiniz</h6>
                <FormGroup tag="fieldset" style={{ textAlign: "justify", display: 'flex', flexDirection: "column" }} >

                    <Row xs={1} >
                        <Col >
                            <FormGroup check >
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Original Red"

                                    onChange={clickHandler}
                                />
                                {' '}
                                <Label check>
                                    Original Red
                                </Label>
                            </FormGroup>
                        </Col> <Col>
                            <FormGroup check>
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Garlic Ranc"
                                    onChange={clickHandler}
                                />
                                {' '}
                                <Label check>
                                    Garlic Ranch
                                </Label>
                            </FormGroup>
                        </Col></Row>
                    <Row xs={1}>
                        <Col>
                            <FormGroup check >
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="BBQ Sauce"
                                    onChange={clickHandler}
                                />
                                {' '}
                                <Label check>
                                    BBQ Sauce
                                </Label>
                            </FormGroup>
                        </Col><Col>
                            <FormGroup check>
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Spinach Alfredo"
                                    onChange={clickHandler}
                                />
                                {' '}
                                <Label check>
                                    Spinach Alfredo
                                </Label>
                            </FormGroup>
                        </Col></Row>
                </FormGroup>
                <h6>Ek malzemeler</h6>
                <div style={{ textAlign: "justify" }}>
                    <Row xs={3}>
                        <Col> <FormGroup
                            check
                        >
                            <Input type="checkbox" name="pepperoni" onChange={checkHandler} />
                            <Label check>
                                Pepperoni
                            </Label>
                        </FormGroup>
                        </Col><Col>
                            <FormGroup
                                check
                            >
                                <Input type="checkbox" name="misir" onChange={checkHandler} />
                                <Label check>
                                    Mısır
                                </Label>
                            </FormGroup>
                        </Col><Col>
                            {' '}
                            <FormGroup
                                check
                            >
                                <Input type="checkbox" name="domates" onChange={checkHandler} />
                                <Label check>
                                    Domates
                                </Label>
                            </FormGroup>
                            {' '}
                        </Col></Row><Row xs={3}>
                        <Col>
                            <FormGroup
                                check
                            >
                                <Input type="checkbox" name="sarimsak" onChange={checkHandler} />
                                <Label check>
                                    Sarımsak
                                </Label>
                            </FormGroup>
                            {' '}
                        </Col><Col>
                            <FormGroup
                                check
                            >
                                <Input type="checkbox" name="sogan" onChange={checkHandler} />
                                <Label check>
                                    Soğan
                                </Label>
                            </FormGroup>
                            {' '}</Col><Col>
                            <FormGroup
                                check
                            >
                                <Input type="checkbox" name="biber" onChange={checkHandler} />
                                <Label check>
                                    Biber
                                </Label>
                            </FormGroup>
                            {' '}</Col></Row>

                    <hr />
                    <FormGroup style={{ textAlign: "center", margin: "2rem 0 1rem 0" }}>
                        <Label for="not" >
                            <h6>Sipariş Notunuzu Giriniz</h6>
                        </Label>
                        <Input type="text" name="not" id="special-text" onChange={changeHandler} />
                    </FormGroup>
                </div>
                <Button disabled={disableButton} id="order-button" style={{ color: "#292929", backgroundColor: "#FDC913", border: "0", padding: "5%", marginTop: "1rem" }}>
                    Sipariş Ver
                </Button>
            </Form >
        </div >
    )
}

export default OrderForm