import React, { useState, useEffect } from 'react'
import { FormGroup, Form, Input, Label, Button, Row, Col, FormFeedback } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';
import "./Form.css";

const OrderForm = ({ siparisSonucu }) => {

    const toppings = ['Sosis', 'Jambon', 'Mantar', 'Biber', 'Zeytin', 'Sucuk', `Ananas`, `Jalapeno`, `Soğan`, `Domates`, `Mısır`, `Sarımsak`];

    const [siparisDetayi, setSiparisDetayi] = useState({
        boy: "",
        sos: "",
        malzemeler: [],
        not: "",
    });


    const [selectedToppings, setSelectedToppings] = useState([]);

    const [formErrors, setFormErrors] = useState({
        isim: "",
        boy: "",
        sos: "",
        malzemeler: "",
        not: "",
    });

    const formSchema = Yup.object().shape({
        isim: Yup
            .string()
            .required("İsim alanı zorunlu")
            .min(2, "En az 2 harf olmalı"),
        boy: Yup.string().required("Pizza boyunuzu seçmeniz gerekiyor."),
        sos: Yup.string().required("Pizza sosu seçmeniz gerekiyor."),
        malzemeler: Yup.array().max(10, "En fazla 10 malzeme seçebilirsiniz."),
        not: Yup.string(),
    });

    const [disableButton, setDisableButton] = useState(true);


    // Yup.object({ checked: Yup.array().min(1, 'Select atleast one option of your interest') });
    // toppings: yup.array().max(5).of(yup.string().required()).required(),
    // required isn't required for checkboxes.

    const navigate = useNavigate();

    const changeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        Yup.reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setFormErrors({ ...formErrors, [name]: "" });
            })
            .catch(err => {
                setFormErrors({ ...formErrors, [name]: err.errors[0] });
            })

        setSiparisDetayi({ ...siparisDetayi, [name]: value });
    };

    const clickHandler = (e) => {
        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: e.target.id });
    };

    const checkHandler = (e) => {
        const topping = e.target.value;

        if (selectedToppings.includes(topping)) {
            setSelectedToppings(selectedToppings.filter((i) => i !== topping));
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    };



    useEffect(() => {
        setSiparisDetayi({ ...siparisDetayi, malzemeler: selectedToppings })
        formSchema
            .validate(siparisDetayi)
            .then(() => setFormErrors({ ...formErrors, malzemeler: "" }))
            .catch((err) => setFormErrors({ ...formErrors, malzemeler: err.errors }));
    }, [selectedToppings]);


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
        console.log("siparis detayi >", siparisDetayi);

        formSchema.isValid(siparisDetayi).then(valid => {
            setDisableButton(!valid)
        })

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
                    <Input invalid={formErrors.isim} type="text" name="isim" id="name-input" onChange={changeHandler} />
                    <FormFeedback>{formErrors.isim} </FormFeedback>
                    <hr />
                </FormGroup>
                <h5>Pizzanızın detaylarını seçiniz!</h5>
                <Row style={{
                    textAlign: "justify"
                }} >
                    <Col md={6} >
                        <FormGroup style={{ width: "30vw" }}>
                            <br />
                            <h6>Pizza Boyu</h6>
                            <Input
                                id="size-dropdown"
                                name="boy"
                                type="select"
                                value={siparisDetayi.boy}
                                onChange={changeHandler} invalid={formErrors.boy}
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
                            <FormFeedback>{formErrors.boy}</FormFeedback>
                        </FormGroup>
                    </Col></Row>
                <h6>Sosunuzu Seçiniz</h6>
                <FormGroup tag="fieldset" style={{
                    textAlign: "justify",
                    display: 'flex',
                    flexDirection: "column"

                }} >
                    <Row style={{
                        textAlign: "justify"
                    }} >
                        <Col md={6} >
                            <FormGroup check >
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Original Red"
                                    invalid={formErrors.sos}
                                    onChange={clickHandler}
                                />
                                {' '}
                                <Label check>
                                    Original Red
                                </Label>
                                <FormFeedback>{formErrors.sos}</FormFeedback>
                            </FormGroup>

                            <FormGroup check>
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Garlic Ranc"
                                    onChange={clickHandler}
                                    invalid={formErrors.sos}
                                />
                                {' '}
                                <Label check>
                                    Garlic Ranch
                                </Label>
                                <FormFeedback>{formErrors.sos}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup check >
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="BBQ Sauce"
                                    onChange={clickHandler}
                                    invalid={formErrors.sos}
                                />
                                {' '}
                                <Label check>
                                    BBQ Sauce
                                </Label>
                                <FormFeedback>{formErrors.sos}</FormFeedback>
                            </FormGroup>

                            <FormGroup check>
                                <Input
                                    name="sos"
                                    type="radio"
                                    id="Spinach Alfredo"
                                    onChange={clickHandler}
                                    invalid={formErrors.sos}
                                />
                                {' '}
                                <Label check>
                                    Spinach Alfredo
                                </Label>
                                <FormFeedback>{formErrors.sos}</FormFeedback>
                            </FormGroup>
                        </Col></Row>
                </FormGroup>

                <FormGroup>
                    <Label for="toppings" ><h6>Ekstra Malzemeler</h6></Label>
                    {formErrors.malzemeler && <FormFeedback>{formErrors.malzemeler}</FormFeedback>}
                    <div style={{
                        width: "30vw", textAlign: "justify",
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "space-between"
                    }}>
                        {toppings.map((e, index) => (

                            <FormGroup check style={{ flex: '0 0 32%' }} >
                                <Label check>
                                    <Input type="checkbox" name={e} value={e} checked={selectedToppings.includes(e)} onChange={checkHandler} />
                                    {e}
                                </Label>
                            </FormGroup>

                        ))}
                    </div>
                </FormGroup>

                <FormGroup style={{ textAlign: "center", margin: "2rem 0 1rem 0" }}>
                    <Label for="not" >
                        <h6>Sipariş Notunuzu Giriniz</h6>
                    </Label>
                    <Input type="text" name="not" id="special-text" onChange={changeHandler} />
                </FormGroup>


                <Button disabled={disableButton} id="order-button" style={{
                    color: "#292929",
                    backgroundColor: "#FDC913",
                    border: "0.15rem white solid",
                    padding: "3%",
                    margin: "1rem 0",
                    borderRadius: "1rem"
                }}>
                    Sipariş Ver
                </Button>
            </Form >
        </div >
    )
}

export default OrderForm