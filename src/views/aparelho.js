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
  Label,
  Input,
} from "reactstrap";

//FirebsaeConfigs
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
import ModalAdd from "components/ModalAddAparelho/Modal";
import ModalExcluir from 'components/ModalExcluir/ModalExcluir'
import './index.css'
import  ModalExample from 'components/ModalEditAparelho/ModalO'

import 'primeicons/primeicons.css';




const Aparelho = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

    const [modelo, setModelo] = useState('')
    const [imei1, setImei1] =   useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    
    const [listaAparelho,setListaAparelho] = useState([])
    const [aparelhos,setAparelhos] = useState([])
    
    const [idAparelho, setIdAparelho] = useState('')

    const [renderizar ,setRenderizar] = useState(false)

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

 

///////////////////////////////////////função excluir///////////////////////////////////
async function excluirAparelho(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Aparelhos", id)
  await deleteDoc(excluDoc)
  .then(() =>{
      alert("sucesso na exclusão " + id)
  })
  setRenderizar(!renderizar)
  setFilter([])
}
///////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////função de exibição///////////////////////////// 
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

  },[renderizar])
  ////////////////////////////////////////////////////////////////////////////////

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

   //////////////////////////////////////////////////////////////////////////// /

  //  PESQUISA
   const [filter, setFilter] = useState([]);

   function Pesquisa(e){
    console.log(e)
    
    const filteredAparelhos = aparelhos.filter(aparelho =>
      aparelho.imei1.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredAparelhos,"APARELJP")
    setFilter(filteredAparelhos);
  }
  // __________________________________________________________________________________________________________
  return (
    <>
      <Header />

                                                {/* CAMPO DE BUSCA */}
                    <div className="campoBusca">
                 
                    </div>
                          

      {/* Page content */}
      <Container className="mt--5" fluid>
        <Row>
          
          
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Aparelhos</h3>
                   </div>

                   
                  <div className="divADICIONAR"> 
                  <input type="search" placeholder='Pesquisar Imei' onChange={(e) => Pesquisa(e.target.value)} />

             

                    <ModalAdd/>
                    
                  </div>

               
    
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>


              <thead className="thead-light">
                  <tr className="justificar">
                    <th scope="col">Modelo</th>
                    <th scope="col">Marca</th>
                    <th scope="col" >1º IMEI</th>
                    <th scope="col" >2º IMEI</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>

{filter.length > 0 ? 
                <tbody>
                   
                   {filter.map((aparelhos) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                      <div> 

                    
         
                        <div className="OrganizarBotoes">

              
                          <ModalExample data={aparelhos}/>
                          <ModalExcluir  
                           func={() => excluirAparelho(aparelhos.id)}
                           renderizar ={renderizar}  
                           setRenderizar={setRenderizar}/>
                        </div>


                        </div>
                    </td>
                      </tr>
                    )
                   })}


                </tbody>
                :
                <tbody>
                   
                   {aparelhos.map((aparelhos) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                      <div> 

                    
         
                        <div className="OrganizarBotoes">

              
                          <ModalExample data={aparelhos}/>
                          <ModalExcluir func={() => excluirAparelho(aparelhos.id)} />

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
