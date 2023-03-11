import React, { useState, useEffect } from 'react'
import { FormGroup, Form, Input, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import "./Form.css";

const OrderForm = () => {

    const [siparisDetayi, setSiparisDetayi] = useState({
        size: "",
        sos: "",
        role: "",
    });

    const [cSelected, setCSelected] = useState([]);


    const changeHandler = (e) => {
        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: e.target.value });

    };
    const clickHandler = (e) => {
        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: e.target.id });

    };


    const checkHandler = (e) => {
        if (e.target.checked === true) {
            setSiparisDetayi({ ...siparisDetayi, [e.target.name]: "var" });
        }
    };

    const onCheckboxBtnClick = (e) => {
        const index = cSelected.indexOf(e);
        if (index < 0) {
            cSelected.push(e);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
        setSiparisDetayi({ ...siparisDetayi, [e.target.name]: { cSelected } });
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     
    // };

    useEffect(() => {
        console.log("siparis detayi >", siparisDetayi);
    }, [siparisDetayi]);


    return (
        <div className='formContainer'>
            <Button size='lg' style={{ color: "white", backgroundColor: "#FDC913", border: "0", padding: "10px", marginBottom: "15px" }}>
                <Link style={{ textDecoration: "none", color: "#292929", backgroundColor: "#FDC913" }} to={"/"}>Anasayfa</Link>
            </Button>
            <h2>Pizzanızın detaylarını seçiniz!</h2>
            <Form id="pizza-form">
                <FormGroup id="size-dropdown">
                    <h5>Pizza Boyu</h5>
                    <Input
                        id="size"
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
                <FormGroup tag="fieldset">
                    <h5>Sosunuzu Seçiniz</h5>
                    <FormGroup check>
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
                    <FormGroup check>
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
                </FormGroup>
                <h5>Ek malzemeler</h5>
                <FormGroup
                    check
                >
                    <Input type="checkbox" name="ek-malzeme1" id="c1" onChange={onCheckboxBtnClick} />
                    <Label check>
                        Some input
                    </Label>
                </FormGroup>
                <FormGroup
                    check

                >
                    <Input type="checkbox" name="ek-malzeme2" onChange={checkHandler} />
                    <Label check>
                        Some other input
                    </Label>
                </FormGroup>
                {' '}
                <FormGroup
                    check

                >
                    <Input type="checkbox" name="ek-malzeme3" onChange={checkHandler} />
                    <Label check>
                        Some other input
                    </Label>
                </FormGroup>
                {' '}
                <FormGroup
                    check

                >
                    <Input type="checkbox" name="ek-malzeme4" onChange={checkHandler} />
                    <Label check>
                        Some other input
                    </Label>
                </FormGroup>
                {' '}
                <Button style={{ color: "#292929", backgroundColor: "#FDC913", border: "0", padding: "10%", marginTop: "15px" }}>
                    Sipariş Ver!
                </Button>

            </Form>


        </div>
    )
}

export default OrderForm