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
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ModalExcluir from '../components/ModalExcluir/ModalExcluir'


import {db} from '../firebase'
  import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddHt/Modal";
import ModalEditHt from "components/ModalEditHt/ModalEditHt";
import ClientesPDF from "components/RepostPdf/ClientesHt/index";

const Aparelho = (props) => {



    const [ht, setHt]= useState([])
    const [renderizar, setRenderizar] = useState(false);

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


  //////////////////////////////////////////função de exibição////////////////////////////////////////////

useEffect(()=>{
  async function loadHt(){
    const unsub = onSnapshot(collection(db,'Ht'), (snapshot)=>{
      let listaHt = [];

      snapshot.forEach((doc)=>{
        listaHt.push({
          id: doc.id,
          marca: doc.data().marca,
          modelo: doc.data().modelo,
          nserie: doc.data().nserie,
          base: doc.data().base,
        })
      })
      setHt(listaHt);
    });

  }
    loadHt();

},[renderizar])
//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////função excluir///////////////////////////////////
async function excluirHt(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Ht", id)
  await deleteDoc(excluDoc)
  .then(() =>{
      toast.error("O Ht foi excluido permanentemente");
      /* alert("sucesso na exclusão " + id) */
  })
  .catch((error)=>{
    toast.error('Algo deu errado, tente novamente mais tarde')

  });
}
///////////////////////////////////////////////////////////////////////////////////////
const [filter, setFilter] = useState([]);

function Pesquisa(e){
 console.log(e)
 
 const filteredHts = ht.filter(hts =>
   hts.nserie.toLowerCase().includes(e.toLowerCase())
 );
 console.log(filteredHts,"HT")
 if (filteredHts.length === 0) {
   toast.error("Nenhum Ht foi encontrado");
   
 } else {
   setFilter(filteredHts);
 }
}

  return (
    <>
    <ToastContainer/>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">

                <div className="conteinerSearch">
                  <div className="col divADICIONAR">
                    <h3 className="mb-0">HT</h3>
                    <input type="search" placeholder='Pesquisa por Imei' onChange={(e) => Pesquisa(e.target.value)} />
                  </div>

                  <div className="divADICIONAR btn" style={{justifyContent : "space-between"}}> 
                    <Modall/>
                    <Button color="danger" onClick={(e) => ClientesPDF(ht)}><i class="far fa-file-pdf"></i> Gerar PDF</Button>{' '}
                  </div>
                  </div>
            
                </Row>
              </CardHeader>


              <Table className="align-items-center table-flush" responsive>
                
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Número de série </th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Base</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {filter.length > 0 ?
                <tbody>
                  {filter.map((hts)=>{
                    return(
                      
                      <tr key={hts.id}>

                        <th scope="row">{hts.nserie}</th>
                        <th scope="row">{hts.marca}</th>
                        <th scope="row">{hts.modelo}</th>
                        <th scope="row">{hts.base}</th>
                        <td>

                          <div> 
              
                            <div className="OrganizarBotoes">
                              {<ModalEditHt data= {hts}/>}
                            {/* <ModalEditChip data= {chips}/> */}
                          
                              <ModalExcluir 
                              title='Ht'
                              func={() => excluirHt(hts.id)} />
                            </div>


                          </div>
                        </td>
                      </tr>
                      

                    )
                  })}
                </tbody>
:
                <tbody>
                  {ht.map((hts)=>{
                    return(
                      
                      <tr key={hts.id}>

                        <th scope="row">{hts.nserie}</th>
                        <th scope="row">{hts.marca}</th>
                        <th scope="row">{hts.modelo}</th>
                        <th scope="row">{hts.base}</th>
                        <td>

                          <div> 
              
                            <div className="OrganizarBotoes">
                              {<ModalEditHt data= {hts}/>}
                            {/* <ModalEditChip data= {chips}/> */}
                          
                              <ModalExcluir 
                              title='Ht'
                              func={() => excluirHt(hts.id)} />
                            </div>


                          </div>
                        </td>
                      </tr>
                      

                    )
                  })}
                </tbody>
}       
               
              </Table>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;
