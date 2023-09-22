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
  Alert,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddChip/Modal";

import ModalEditChip from "components/ModalEditChip/ModalEditChip";
import ModalExcluir from 'components/ModalExcluir/ModalExcluir'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {db} from '../firebase'
 
import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'



const Chip = (props) => {

  const [filter ,setFilter] = useState([])
  const [renderizar ,setRenderizar] = useState(false)
  const [chip, setChip ] = useState([])
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

////////////////////////////////////////////função de exibição////////////////////////////////////////////

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
      setChip(listaChips);
    });

  }
    loadChips();

},[renderizar])
//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////função excluir///////////////////////////////////
async function excluirChip(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Chip", id)
  await deleteDoc(excluDoc)
  .then(() =>{
      toast.error("O chip foi excluido permanentemente");
      /* alert("sucesso na exclusão " + id) */
  })
  .catch((error)=>{
    toast.error('Algo deu errado, tente novamente mais tarde')
    setRenderizar(!renderizar)
    setFilter([])

  });
}
function Pesquisa(e){
  console.log(e)
  
  const filteredChip = chip.filter(chip =>
    
    chip.nserie.toLowerCase().includes(e.toLowerCase())
  );
  console.log(filteredChip,"Chip")
  if (filteredChip.length === 0) {
    // Caso nenhum resultado seja encontrado
    alert("Nenhum resultado encontrado para:", e);
    
    
    // Aqui você pode tomar medidas adicionais, como exibir uma mensagem para o usuário
  } else {
    // Caso resultados sejam encontrados
    setFilter(filteredChip);
  }
}





///////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
     

        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="shadow">
              <CardHeader className="border-0">


                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Chips</h3>
                    <input type="search" placeholder='Pesquisa por Imei' onChange={(e) => Pesquisa(e.target.value)} />
                  </div>

                  <div> 
                    <Modall/>
                  </div>

                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col">Número de Série</th>
                    <th scope="col">Linha</th>
                    <th scope="col">Ações</th>
                
                  </tr>
                </thead>

                {filter.length > 0 ? 
                <tbody>
                {filter.map((chip)=>{

                      return(
                        <tr key={chip.id}>
                          <th scope="row">{chip.nserie}</th>
                          <th scope="row">{chip.linha}</th>

                          <td>

                         

                      <div> 

                    
         
                        <div className="OrganizarBotoes">
                         <ModalEditChip data= {chip}/>
                          <ModalExcluir 
                          title='chip'
                          func={() => excluirChip(chip.id)} />
                        </div>


                              <div className="OrganizarBotoes">
                              <ModalEditChip data= {chip}/>
                                <ModalExcluir func={() => excluirChip(chip.id)} />
                              </div>

                            </div>
                         </td>


                        </tr>
                      )
                    })}


                </tbody>
:
                <tbody>
                {chip.map((chip)=>{

                      return(
                        <tr key={chip.id}>
                          <th scope="row">{chip.nserie}</th>
                          <th scope="row">{chip.linha}</th>

                          <td>
                            <div> 

                              <div className="OrganizarBotoes">
                              <ModalEditChip data= {chip}/>
                                <ModalExcluir func={() => excluirChip(chip.id)} />
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

export default Chip;
