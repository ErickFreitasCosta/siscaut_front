/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    InputGroup,

} from "reactstrap";


import { db } from '../firebase'
import { doc, getDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore'




// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from "components/Headers/Header.js";

const Index = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    const [activeBtnFiscal, setActiveBtnFiscal] = useState(false);
    const [nomeFiscal, setNomeFiscal] = useState('')

    const [activeBtnFiscalInte, setActiveBtnFiscalInte] = useState(false);
    const [nomeFiscalInte, setNomeFiscalInte] = useState('')




    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };

    const docRefFiscal = doc(db, 'fiscais_contrato', 'fiscal');
    const docRefFiscalInte = doc(db, 'fiscais_contrato', 'fiscal_interino');

    useEffect(() => {
        async function loadName() {
            try {


                const [docSnapFiscal, docSnapFiscalInte] = await Promise.all([
                    getDoc(docRefFiscal),
                    getDoc(docRefFiscalInte)

                ]);

                if (docSnapFiscal.exists() || docSnapFiscalInte.exists()) {
                    const nomeFiscal = docSnapFiscal.data().nome;
                    setNomeFiscal(nomeFiscal);

                    const nomeFiscalInte = docSnapFiscalInte.data().nome;
                    setNomeFiscalInte(nomeFiscalInte);

                } else {
                    console.log('Documento não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do Firebase:', error);
            }
        }

        loadName();
    }, [])

    console.log(nomeFiscal)



    async function HandleEditFiscal() {

        try {
            await updateDoc(docRefFiscal, {
                nome: nomeFiscal,
            })

            await updateDoc(docRefFiscalInte, {
                nome: nomeFiscalInte,
            })

            toast.success("O fiscal foi alterado com sucesso!");
        } catch (error) {
            toast.error("Nao foi possivel aterar o fiscal, tente novamente mais tarde!");
        } finally {
            setActiveBtnFiscal(false);
            setActiveBtnFiscalInte(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    {/* <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
                    <Col xl="5">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Painel
                                        </h6>
                                        <h2 className="mb-0">fiscais do contrato</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                {/* <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div> */}

                                <div>
                                    <Col className="mb-4" lg="12">

                                        <label
                                            className="form-control-label"
                                            htmlFor="input-Fiscal"
                                        >
                                            Fiscal do Contrato
                                        </label>
                                        <InputGroup>
                                            {activeBtnFiscal ? (<><Input value={nomeFiscal} onChange={(e) => setNomeFiscal(e.target.value)} />{" "}<Button onClick={(HandleEditFiscal)}>
                                                Salvar
                                            </Button></>) :
                                                (
                                                    <>
                                                        <Input value={nomeFiscal} disabled />

                                                        <Button onClick={() => setActiveBtnFiscal(true)}>
                                                            Editar
                                                        </Button>
                                                    </>
                                                )}

                                        </InputGroup>
                                    </Col>



                                    <Col className="mb-4" lg="12">

                                        <label
                                            className="form-control-label"
                                            htmlFor="input-Fiscal"
                                        >
                                            Fiscal do Contrato interino
                                        </label>
                                        <InputGroup>
                                            {activeBtnFiscalInte ? (<><Input value={nomeFiscalInte} onChange={(e) => setNomeFiscalInte(e.target.value)} />{" "}<Button onClick={HandleEditFiscal}>
                                                Salvar
                                            </Button></>) :
                                                (
                                                    <>
                                                        <Input value={nomeFiscalInte} disabled />

                                                        <Button onClick={() => setActiveBtnFiscalInte(true)}>
                                                            Editar
                                                        </Button>
                                                    </>
                                                )}

                                        </InputGroup>
                                    </Col>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Page visits</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Page name</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col">Unique users</th>
                                        <th scope="col">Bounce rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Social traffic</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Referral</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>1,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">60%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="60"
                                                        barClassName="bg-gradient-danger"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">70%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="70"
                                                        barClassName="bg-gradient-success"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">80%</span>
                                                <div>
                                                    <Progress max="100" value="80" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">75%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="75"
                                                        barClassName="bg-gradient-info"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">30%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
