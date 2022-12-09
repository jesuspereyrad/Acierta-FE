import React, { useEffect, useState } from 'react'
import constant from './constant';
import Logo from '../../images/logo.png'
import LogoMin from '../../images/logo_min.png'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faChartLine, faLandmark, faArrowTrendDown, faArrowTrendUp, faFileAlt, faPrint } from '@fortawesome/free-solid-svg-icons'

import { Button, Col, Container, Form, FormGroup, Nav, Navbar, Row, Spinner, Table, Toast } from 'react-bootstrap';
// import convert from 'xml-js';

import XMLParser from 'react-xml-parser';
import { useParams } from 'react-router-dom';


const CreditReport = () =>  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let {cedula} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://o1wuua11kg.execute-api.us-east-1.amazonaws.com/DEV/?cedula=${cedula}`, {mode: 'cors'})
        .then(res => res.json())
        .then(json_res => setData(json_res))

        // fetch('https://dataportal.jce.gob.do/idcons//IndividualDataHandler.aspx?ServiceID=8a3f2c97-b12b-405a-aa28-5066eae07253&ID1=402&ID2=0050804&ID3=8', 
        // {
        //     headers:{
        //         "accepts":"application/xml"
        //     }
        // })
        // .then(xmlText => {
        //     const xml = new XMLParser().parseFromString(xmlText);    // Assume xmlText contains the example XML
        //     console.log("xml", xml);
        //     console.log(xml.getElementsByTagName('Name'));
        //     // const data = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 2}))
        //     // console.log(data)
        // })
    }, [])

    console.log("Data: ", data)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    const renderHeader = () => (
        <Navbar className="ac-header" style={{backgroundColor: '#0eb0f1', color: '#fff'}}>
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={LogoMin}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/reporte_credito">Reporte</Nav.Link>
            <Nav.Link href="/reclamaciones">Reclamaciones</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/login">Salir</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
    
    const renderVariables = (title, component) => {
        return (
            <Col id="profile_variables">
            <div className="title">
                <h4>Variables Propias</h4>
                <hr></hr>
            </div>
            <Row className="mb-4">
                <div className='variable-row'>
                    <div className='variable-container'>
                        <div className='variable-title'>
                            Score Propio
                        </div>
                        <div className='variable-value'>
                            658
                        </div>
                    </div>
                    <div className='variable-container'>
                        <div className='variable-title'>
                            Segmentacion
                        </div>
                        <div className='variable-value'>
                            {data.hasOwnProperty('summary') ? (data['summary']['total'] > 500000 ? 'PREMIUM' : 'NORMAL') : 'NORMAL'}
                        </div>
                    </div>
                    <div className='variable-container'>
                        <div className='variable-title'>
                            LIMITE / BALANCE
                        </div>
                        <div className='variable-value'>
                            {data.hasOwnProperty('summary') ? `${formatter.format(data['summary']['total'])} / ${formatter.format(data['summary']['balance'])}` : 0}
                        </div>
                    </div>
                    <div className='variable-container'>
                        <div className='variable-title'>
                            Total Cuentas Activas
                        </div>
                        <div className='variable-value'>
                            {data.hasOwnProperty('summary') ? data['summary']['accounts'] : 0}
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="mt-4">
                <div className='variable-row'>
                    <div className='variable-container-icon'>
                        <div className="circle-icon">
                            <FontAwesomeIcon  class="primary-icon" icon={faArrowTrendDown} />
                        </div>
                        <div>
                            <div className='variable-title'>
                                Peor Atraso
                            </div>
                            <div className='variable-value'>
                                60 dias
                            </div>
                        </div>
                    </div>
                    <div className='variable-container-icon'>
                        <div className="circle-icon">
                            <FontAwesomeIcon class="primary-icon" icon={faLandmark} />
                        </div>
                        <div>
                            <div className='variable-title'>
                                Mayor Vinculacion Financiera
                            </div>
                            <div className='variable-value'>
                                TDC - Banco X
                            </div>
                        </div>
                    </div>
                    <div className='variable-container-icon'>
                        <div className="circle-icon">
                            <FontAwesomeIcon class="primary-icon" icon={faWallet} />
                        </div>
                        <div>
                            <div className='variable-title'>
                                Cuenta mas Reciente
                            </div>
                            <div className='variable-value'>
                                TDC - Banco X
                            </div>
                        </div>
                    </div>
                </div>
                <div className='variable-row mt-4'>
                        <div className='variable-container-icon'>
                            <div className="circle-icon">
                                <FontAwesomeIcon class="primary-icon" icon={faArrowTrendUp} />
                            </div>
                            <div>
                                <div className='variable-title'>
                                    Mayor Balance Utilizado
                                </div>
                                <div className='variable-value'>
                                    RD$ 25,000.00
                                </div>
                            </div>
                        </div>
                        <div className='variable-container-icon'>
                            <div className="circle-icon">
                                <FontAwesomeIcon class="primary-icon" icon={faWallet} />
                            </div>
                            <div>
                                <div className='variable-title'>
                                    Mayor Monto en Atraso
                                </div>
                                <div className='variable-value'>
                                    RD$ 1,500.00
                                </div>
                            </div>
                        </div>
                        <div className='variable-container-icon'>
                            <div className="circle-icon">
                                <FontAwesomeIcon class="primary-icon" icon={faFileAlt} />
                            </div>
                            <div>
                                <div className='variable-title'>
                                    Ultima Indagacion
                                </div>
                                <div className='variable-value'>
                                    Solicitud de Credito
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Col>
        )
    }
    const renderProfile = (title, component) => {
        return (
            <Col id="profile_information">
            <div className="title">
                <h4>Informaciones Generales</h4>
                <hr></hr>
            </div>
            <Row>
                <Col lg={4}>
                    <img src="https://via.placeholder.com/200" />
                </Col>
                <Col lg={8}>
                    <Row>
                        <Col lg={6}>
                            <p>Cedula: </p>
                        </Col>
                        <Col lg={6}>
                            <p>###-########-#</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <p>Fecha de Nacimiento</p>
                        </Col>
                        <Col lg={6}>
                            <p>01/01/1990</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <p>Nacionalidad</p>
                        </Col>
                        <Col lg={6}>
                            <p>Dominicana</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <p>Estado Civil</p>
                        </Col>
                        <Col lg={6}>
                            <p>Soltero</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    }



    const renderActiveCreditCard = () => {
        return (
            <Col id="cc_product_information">
            <div className="title">
                <h4>Informacion Detallada De Cuentas Activas TDC</h4>
                <hr></hr>
            </div>
            <Row>
                <Col lg={12}>
                    <Row className="product">
                    <Table>
                        <thead>
                        <tr>
                            <th>Afiliado</th>
                            <th>Tarjeta #</th>
                            <th>Apertura</th>
                            <th>Actualizada</th>
                            <th>Moneda</th>
                            <th>Limite</th>
                            <th>Balance</th>
                            <th>Monto Minimo</th>
                            <th>Mora</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data['credit_card_dop'].map(x => (
                                <tr>
                                    <td>{x.name.toUpperCase()}</td>
                                    <td>{x.card_number_actual}</td>
                                    <td>{new Date(x.open_date).toLocaleDateString('es-DR')}</td>
                                    <td>{new Date(x.last_uploaded_date).toLocaleDateString('es-DR')}</td>
                                    <td>RD</td>
                                    <td>{formatter.format(x.credit_limit)}</td>
                                    <td>{formatter.format(x.balance)}</td>
                                    <td>{formatter.format(x.minimum_payment_amount)}</td>
                                    <td>{formatter.format(x.past_due_amount)}</td>
                                </tr>
                            ))}
                            {data['credit_card_usd'].map(x => (
                                <tr>
                                    <td>{x.name.toUpperCase()}</td>
                                    <td>{x.card_number_actual}</td>
                                    <td>{new Date(x.open_date).toLocaleDateString('es-DR')}</td>
                                    <td>{new Date(x.last_uploaded_date).toLocaleDateString('es-DR')}</td>
                                    <td>USD</td>
                                    <td>{formatter.format(x.credit_limit)}</td>
                                    <td>{formatter.format(x.balance)}</td>
                                    <td>{formatter.format(x.minimum_payment_amount)}</td>
                                    <td>{formatter.format(x.past_due_amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Row>
                    <Row>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    }

    const renderActiveLoans = () => {
        return (
            <Col id="cc_product_information">
            <div className="title">
                <h4>Informacion Detallada De Cuentas Activas PR</h4>
                <hr></hr>
            </div>
            <Row>
                <Col lg={12}>
                    <Row className="product">
                    <Table>
                        <thead>
                        <tr>
                            <th>Afiliado</th>
                            <th>Tipo</th>
                            <th>Apertura</th>
                            <th>Actualizada</th>
                            <th>Moneda</th>
                            <th>Limite</th>
                            <th>Balance</th>
                            <th>Cuota</th>
                            <th>Mora</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data['loan_dop'].length == 0 && data['loan_usd'] == 0 ? (
                            <tr>
                                <td rowSpan={10}>No posee prestamos</td>
                            </tr>
                            ) : null
                            }
                            {data['loan_dop'].map(x => (
                                <tr>
                                    <td>{x.name.toUpperCase()}</td>
                                    <td>{x.loan_type}</td>
                                    <td>{new Date(x.open_date).toLocaleDateString('es-DR')}</td>
                                    <td>{new Date(x.last_uploaded_date).toLocaleDateString('es-DR')}</td>
                                    <td>RD</td>
                                    <td>{formatter.format(x.loan_amount)}</td>
                                    <td>{formatter.format(x.balance)}</td>
                                    <td>{formatter.format(x.loan_installment_amount)}</td>
                                    <td>{formatter.format(x.past_due_amount)}</td>
                                </tr>
                            ))}
                            {data['loan_usd'].map(x => (
                                <tr>
                                    <td>{x.name.toUpperCase()}</td>
                                    <td>{x.type}    </td>
                                    <td>{new Date(x.open_date).toLocaleDateString('es-DR')}</td>
                                    <td>{new Date(x.last_uploaded_date).toLocaleDateString('es-DR')}</td>
                                    <td>USD</td>
                                    <td>{formatter.format(x.loan_amount)}</td>
                                    <td>{formatter.format(x.balance)}</td>
                                    <td>{formatter.format(x.loan_installment_amount)}</td>
                                    <td>{formatter.format(x.past_due_amount)}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                    </Row>
                    <Row>
                    </Row>
                </Col>
            </Row>
        </Col>
        )
    }

    const renderSearch = () => (
        <Col id="cc_product_information">
            <div className="title">
                <h4>Indagaciones</h4>
                <hr></hr>
            </div>
            <Row>
                <Col lg={12}>
                    <Row className="product">
                    <Table>
                        <thead>
                        <tr>
                            <th>Tipo de consulta</th>
                            <th>Motivo de la consulta</th>
                            <th>Fecha de la consulta</th>
                            <th>Hora de consulta</th>
                            <th>Via</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Acierta</td>
                            <td>Analisis de cartera</td>
                            <td>12/11/2022</td>
                            <td>11:26pm</td>
                            <td>Acierta Econsistema</td>
                        </tr>
                        <tr>
                            <td>Acierta</td>
                            <td>Analisis de cartera</td>
                            <td>12/11/2022</td>
                            <td>11:26pm</td>
                            <td>Acierta Econsistema</td>
                        </tr>

                        </tbody>
                    </Table>
                    </Row>
                    <Row>
                    </Row>
                </Col>
            </Row>
            <Row>
            <p><strong>Final de Reporte de Crédito Acierta Consulting</strong><br/> 
Esta información se suministra como una herramienta de evaluación de riesgos operativos y crédito. Este reporte está fundamentado en información otorgada de <br/>
buena fe por parte de otorgantes de crédito, y otras fuentes, en la forma y términos que se reciben de éstos. El uso abusivo de esta información, divulgación,<br/>
acceso no autorizado, fuera de los fines establecidos por la Ley No.172-13, será sancionado en virtud de lo dispuesto en sus artículos 86-88</p>
            </Row>
        </Col>
    )
    
    if (data.hasOwnProperty("summary")) {

        return (
            <>
                {renderHeader()}
                <Container>
                    <Row className="mb-4 pb-4">
                        <div className='header-report'>
                            <div style={{width: "120px"}}>
                                <img width={"120px"} src={Logo} />
                            </div>
                            <h2>Historia de credito</h2>
                            <div>
                                <FontAwesomeIcon icon={faPrint} />
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-4 pb-4 shadow p-3 mb-5 bg-white rounded">
                        {renderProfile()}
                    </Row>
                    <Row className="mb-4 pb-4 shadow p-3 mb-5 bg-white rounded">
                        {renderVariables()}
                    </Row>
                    <Row className="mb-4">
                        {data.hasOwnProperty('credit_card_dop') ? renderActiveCreditCard() : null}
                    </Row>
                    <Row className="mb-4">
                        {data.hasOwnProperty('loan_dop') ? renderActiveLoans() : null}
                    </Row>
                    <Row className="mb-4">
                        {renderSearch()}
                    </Row>
                </Container>
            </>
        )
    } else {
       return (
        <Container style={{height: '100vh', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: "120px"}}>
                <img width={"120px"} src={Logo} />
            </div>
            <Spinner animation="grow" variant="primary" style={{position: 'absolute', marginBottom: '45px', marginRight: '15px', backgroundColor: '#0eb0f1'}} />
        </Container>
       )
    }
}

export default CreditReport;
