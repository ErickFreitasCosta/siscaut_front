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

// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts

// reactstrap components
import {
  Button,
  Card,
  CardHeader,

  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
 
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddUser/Modal";
import ModalExcluir from '../components/ModalExcluir/ModalExcluir'
import ModalEditUser from '../components/ModalEditUser/ModalEditUser'

import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'
    import {db} from '../firebase'

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [modelo, setModelo] = useState('')

  const [militares, setMilitares] = useState([])
  const [listaMilitares, setListaMilitares] = useState([])
  const [nome, setNome] = useState('')
  const [funcao, setFuncao] = useState('')
  const [rg, setRg] = useState('')
  const [unidade, setUnidade] = useState('')
  const [postgrad, setPostgrad] = useState('')



  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };


  ///////////////////////////////////////função excluir///////////////////////////////////
async function excluirMilitar(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Militares", id)
  await deleteDoc(excluDoc)
  .then(() =>{
      alert("sucesso na exclusão " + id)
  })
}
///////////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////função de exibição///////////////////////////// 
  useEffect(()=>{
    async function loadMilitares(){
      const unsub = onSnapshot(collection(db,'Militares'), (snapshot)=>{
        let listaMilitares = [];

        snapshot.forEach((doc)=>{
          listaMilitares.push({
            id: doc.id,
            funcao: doc.data().funcao,
            nome: doc.data().nome,
            postgrad: doc.data().postgrad,
            rg: doc.data().rg,
            unidade: doc.data().unidade

          })
        })
        setMilitares(listaMilitares);
      });

    }
      loadMilitares();

  },[])
  ////////////////////////////////////////////////////////////////////////////////







  return (
    <>
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
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Usuários Cadastrados</h3>
                  </div>
                  <div> 
                    
                    <Modall/>

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
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">  Rg</th>
                    <th scope="col">Posto/Grad</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">função</th>
                    <th scope="col">Ações</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {militares.map(militares=>{

                      return(
                        <tr key={militares.id}>
                        <th>{militares.nome}</th>
                        <th>{militares.rg}</th>
                        <th>{militares.postgrad}</th>
                        <th>{militares.unidade}</th>
                        <th>{militares.funcao}</th>
                        <td>
                      <div> 

                    
         
                        <div className="OrganizarBotoes">

                          
                        <ModalEditUser data={militares}/>
                          <ModalExcluir func={() => excluirMilitar(militares.id)} />
                        </div>


                        </div>
                    </td>

                        </tr>
                      )
                  })}
                 
               
               
                  
                </tbody>
              </Table>
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

export default Index;
