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
import {Link} from "react-router-dom";

import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import './index.css'
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
  Spinner,
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {db} from '../firebase'
import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc, query,where , getDocs, getDoc } from 'firebase/firestore'


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import ModalInfDescaut from "components/ModalInfDescaut/ModalInDescaut";

const Aparelho = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  




  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [loading,setLoading] = useState(false)
  const [renderizar ,setRenderizar] = useState(false)
  
  const [cautelas, setCautelas] = useState([])

  const [cautInf, setCautInf] = useState([])

  


  useEffect(() => {
    async function getCautelados() {
      setLoading(true)
      try {
        const cauteladosQuery = query(
          collection(db, "Cautelas"),
          where("cautela", "==", false)
        );
        const data = await getDocs(cauteladosQuery);
        const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCautelas(response);
      } catch (error) {
        console.error('Erro ao buscar cautelas:', error);
      }
    }
  
    getCautelados();
  }, []);
  
  useEffect(() => {
    async function getInfCaut() {
      try {
        const listaPromises = cautelas.map(async (cautela) => {
          const docRefChip = doc(db, 'Chip', cautela.chip);
          const docRefMilitar = doc(db, 'Militares', cautela.militar);
          const docRefAparelho = doc(db, 'Aparelhos', cautela.aparelho);
    
          const [docSnapChip, docSnapMilitar, docSnapAparelho] = await Promise.all([
            getDoc(docRefChip),
            getDoc(docRefMilitar),
            getDoc(docRefAparelho),
          ]);
    
          return {
            id: cautela.id,
            date: cautela.data,
            numero: docSnapChip.data().numero,
            linha: docSnapChip.data().linha,
            nserie: docSnapChip.data().nserie,
            imei1: docSnapAparelho.data().imei1,
            imei2: docSnapAparelho.data().imei2,
            marca: docSnapAparelho.data().marca,
            modelo: docSnapAparelho.data().modelo,
            funcao: docSnapMilitar.data().funcao,
            nome: docSnapMilitar.data().nome,
            postgrad: docSnapMilitar.data().postgrad,
            rg: docSnapMilitar.data().rg,
            unidade: docSnapMilitar.data().unidade,
          };
        });
    
        const lista = await Promise.all(listaPromises);
        setCautInf(lista);
      } catch (error) {
        console.error('Erro ao buscar informações:', error);
      } finally {
        setLoading(false)
      }
    }
    
  
    if (cautelas.length > 0) {
      getInfCaut();
    }
  }, [cautelas]);
  





 console.log(cautInf)

  /////////////////////////////////////////função de exibição///////////////////////////// 
  /* useEffect(() => {
    // Cria uma função para atualizar a lista de aparelhos com base nos dados do snapshot
    function updateAparelhos(snapshot) {
      let listaAparelhos = [];
  
      snapshot.forEach((doc) => {
        listaAparelhos.push({
          id: doc.id,
          imei1: doc.data().imei1,
          imei2: doc.data().imei2,
          marca: doc.data().marca,
          modelo: doc.data().modelo,
        });
      });
  
      setAparelhos(listaAparelhos);
    }
  
    // Cria a consulta inicial
    const q = query(
      collection(db, 'Aparelhos'),
      where('cautelado', '==', true)
    );
  
    // Executa a consulta inicial e ouve as atualizações em tempo real
    const unsub = onSnapshot(q, (snapshot) => {
      updateAparelhos(snapshot);
    });
  
    //  função de limpeza para interromper a observação quando o componente for desmontado
    return () => unsub();
  }, []); // 
   */
  
  
  return (
    <>
    <ToastContainer/>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
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
                Chart
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
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="11">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Aparelhos</h3>
                  </div>
                  <div> 
      

                   
                  </div>
                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr className="justificar">
                    <th scope="col">Militar</th>
                    <th scope="col">Rg</th>
                    <th scope="col" className="ajeitar">Aparelho</th>
                    <th scope="col" className="ajeitar">Imei</th>
                    <th scope="col" className="ajeitar">Número</th>
                    <th scope="col" className="ajeitar">Data cautela</th>
                    <th scope="col" className="ajeitar">Data Devolução</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {<tr>
                    <th scope="row">S20</th>
                    <td>Samsung</td>
                    <td>340 123 432 234 785</td>
                    
                    <td>
                        ////SO É O BUTTON DE CAUTELAR DE APARELHOS
                        <Modall/>
                    </td>
                  </tr>} */}

{cautInf.map((infcauts) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={infcauts.id}>
                        <th scope="row">{infcauts.nome}</th>
                        <th scope="row">{infcauts.rg}</th>
                        <th scope="row">{infcauts.modelo}</th>
                        <th scope="row">{infcauts.imei1}</th>
                        <th scope="row">{infcauts.numero}</th>
                        <th scope="row">{infcauts.date}</th>

                        <td>
                      <div> 

                    
         
                        <div className="OrganizarBotoes">

                       
                          

                        </div>


                        </div>
                    </td>
                      </tr>
                    )
                   })}
              
               
                
                 
                </tbody>
                
              </Table>
              {loading ? <div className="centralizar_load"><Spinner
  color="primary"
  style={{
    height: '3rem',
    width: '3rem'
  }}
>
  Loading...
</Spinner></div> :''}
            </Card>
          </Col>
          {/* <Col xl="4">
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
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;
