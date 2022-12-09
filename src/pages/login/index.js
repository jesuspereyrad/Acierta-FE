import React, { useState } from 'react'
import constant from './constant';
import Logo from '../../images/logo.png'
import LogoMin from '../../images/logo_min.png'
import './style.css'
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row, Toast } from 'react-bootstrap';

const Login = () =>  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault()
        console.log("Here")
        if (username == 'demo' && password == 'Aciertamania1^') {
            setError(false)
            navigate("/reporte_credito/40200508048")
            console.log("Success")
        }
        else {
            setError(true)
        }
    }

        const errorToast = () => (
            <Toast>
                <Toast.Header>
                <img width="24px" src={LogoMin} className="rounded me-2" alt="" />
                <strong className="me-auto">Error</strong>
                <small>Hace 1 segundo</small>
                </Toast.Header>
                <Toast.Body>Confirme su usuario y clave y digítelos nuevamente.</Toast.Body>
            </Toast>
        )
        return (
            <Container fluid style={{height: '100vh', marginLeft: '0px !important'}}>
                
                <Row style={{height: '100%'}}>
                    <Col lg={9}>
                        <Row style={{height: '100%'}}>
                        <div className='image-container'>
                            <h1>{constant.TITLE}</h1>
                            <h6>{constant.SUBTITLE}</h6>
                        </div>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <Container>
                            <Row>

                                <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                    <div style={{marginTop: '2rem'}}>
                                        {error ? errorToast() : null}
                                    </div>
                                    <div style={{marginTop: '2rem', marginBottom: '2rem', width: '75%'}}>
                                        <img style={{width: '100%'}} src={Logo} /> 
                                    </div>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>{constant.FORM.USERNAME.LABEL}</Form.Label>
                                            <Form.Control type="email" placeholder={constant.FORM.USERNAME.PLACEHOLDER} onChange={event => setUsername(event.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>{constant.FORM.PASSWORD.LABEL}</Form.Label>
                                            <Form.Control type="password" placeholder={constant.FORM.PASSWORD.PLACEHOLDER} onChange={event => setPassword(event.target.value)} />
                                        </Form.Group>
                                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                            <Button className="ac-btn-link btn-link">{constant.FORM.FORGOT_PASSWORD}</Button>
                                            <Button className="ac-btn" disabled={!(username && password)} variant="primary" type="submit"  size="lg" classNAme="btn-round" onClick={event => onSubmit(event)}>{constant.FORM.BUTTON}</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
}

export default Login;
