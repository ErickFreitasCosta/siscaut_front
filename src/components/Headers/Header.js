/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
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
//                                    ITENS DO PAINEL INICIAL

// reactstrap components
import { db } from "../../firebase";
import { collection, onSnapshot} from 'firebase/firestore'
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
// import Aparelho from "views/Cautelar";
import Foto from "../../assets/img/brand/icons8-roteador-wi-fi-50.png"







const Header = () => {
  const [aparelhos,setAparelhos] = useState([])
  

  // QUANTIDADE NA TELA
  const [Chips,setChips] = useState([])
  const [modem,setModem] = useState([])
  const [ht,setHt] = useState([])

  //////////////////////////////////

  







  useEffect(()=>{
    async function loadAparelhos(){
      const unsub = onSnapshot(collection(db,'Aparelhos'), (snapshot)=>{
        let listaAparelhos = [];

        snapshot.forEach((doc)=>{
          listaAparelhos.push({
            id: doc.id,
            imei1: doc.data().imei1,
            imei2: doc.data().imei2,
            marca: doc.data().marca,
            modelo: doc.data().modelo
          })
        })
        setAparelhos(listaAparelhos);
      });
      

    }
      loadAparelhos();

  },[])

  useEffect(()=>{
    async function loadChips(){
      const unsub = onSnapshot(collection(db,'Chip'), (snapshot)=>{
        let listaChips = [];

        snapshot.forEach((doc)=>{
          listaChips.push({
            id: doc.id,
            nserie: doc.data().nserie,
            linha: doc.data().linha,
          })
        })
        setChips(listaChips);
      });

    }
      loadChips();

  },[])

  useEffect(()=>{
    async function loadModem(){
      const unsub = onSnapshot(collection(db,'Modem'), (snapshot)=>{
        let listaModem = [];

        snapshot.forEach((doc)=>{
          listaModem.push({
            id: doc.id,
            imei1: doc.data().imei1,
            imei2: doc.data().imei2,
            marca: doc.data().marca,
            modelo: doc.data().modelo
          })
        })
        setModem(listaModem);
      });

    }
      loadModem();

  },[])

  useEffect(()=>{
    async function loadHt(){
      const unsub = onSnapshot(collection(db,'Ht'), (snapshot)=>{
        let listaModem = [];

        snapshot.forEach((doc)=>{
          listaModem.push({
            id: doc.id,
            imei1: doc.data().imei1,
            imei2: doc.data().imei2,
            marca: doc.data().marca,
            modelo: doc.data().modelo
          })
        })
        setHt(listaModem);
      });

    }
      loadHt();

  },[])








  
  return (


    <>
      <div className="header pb-8 pt-5 pt-md-8 " style={{backgroundColor :"#193D5A"}}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="3" xl="1">

              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          
                          Quantidade

                        </CardTitle>
                       
                       
                        <span className="h1 font-weight-bold mb-0">
                        <h1> {aparelhos.length}</h1>
                          
                
              
                          </span>

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa fa-mobile" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Quantidade
                        </CardTitle>
                        <span className="h1 font-weight-bold mb-0"> 

                        {/* <h1> {Chips.length}</h1> */}
                        <h1> {ht.length}</h1>
                        
                         </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fas fa fa-walkie-talkie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Quantidade
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          
                          
                        <h1> {Chips.length}</h1>
                          
                          
                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-sim-card" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>


              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Quantidade
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          
                        <h1> {modem.length}</h1>
                          
                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <img src={Foto} style={{width:"39px"}}/>
                        </div>
                      </Col>
                      
                    </Row>
                 
                  </CardBody>
                </Card>
              </Col>

       

              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
