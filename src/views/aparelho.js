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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//FirebsaeConfigs
import {db} from '../firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
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


    const [aparelhos,setAparelhos] = useState([])
    const [renderizar ,setRenderizar] = useState(false)

    const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(aparelhos.length / itensPerPage)
  const startIndex= currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = aparelhos.slice(startIndex, endIndex)

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

 

///////////////////////////////////////função excluir///////////////////////////////////
async function excluirAparelho(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Aparelhos", id)
  await deleteDoc(excluDoc)
  .then(() =>{
    toast.error('O aparelho foi excluido permanentemente')
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////// FUNÇÃO PESQUISA  ////////////////////////////////////////////////
   const [filter, setFilter] = useState([]);

   function Pesquisa(e){
    console.log(e)
    
    const filteredAparelhos = aparelhos.filter(aparelho =>
      aparelho.imei1.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredAparelhos,"APARELJP")
    if (filteredAparelhos.length === 0) {
      toast.error("Nenhum Aparelho foi encontrado");
      
    } else {
      setFilter(filteredAparelhos);
    }
  }
  // ____________________________________________________________________________________________________________
  return (
    <>
    <ToastContainer/>
      <Header />

                                                {/* CAMPO DE BUSCA */}
                    <div className="campoBusca">
                 
                    </div>
                          

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
                      <h3 className="mb-0">Aparelhos</h3>
                      <input type="search" placeholder='Pesquisa por Imei' onChange={(e) => Pesquisa(e.target.value)} />
                     </div>
                    
                    <div className="divADICIONAR" style={{justifyContent : "flex-end"}}>
                    
                        <ModalAdd/>
                    </div>
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
                   
                   {currentItens.map((aparelhos) =>{
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

              <nav aria-label="Page navigation example">
            <Pagination className="pagination justify-content-center bordaPagination"
            listClassName="justify-content-center"  >

            <PaginationItem>
    <PaginationLink
      first
      
      href="#page1"

      onClick={() => setCurrentPage(0)}
    >
      
    </PaginationLink>
  </PaginationItem>


            <PaginationItem>
                <PaginationLink
                  href={`#page${currentPage + 1}`}
                  previous
                  onClick={() => {
                    if (currentPage > 0) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>

              {Array.from(Array(pages), (item, index) => {
                const pageToShow = 5; // Número de páginas a serem exibidas
                const firstPage = Math.max(0, currentPage - Math.floor(pageToShow / 2));
                const lastPage = Math.min(pages - 1, firstPage + pageToShow - 1);

                if (index >= firstPage && index <= lastPage) {
                  return (
                    <PaginationItem key={index} active={index === currentPage}>
                      <PaginationLink
                        href={`#page${currentPage + 1}`}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}


              <PaginationItem>
                <PaginationLink
                  href={`#page${currentPage + 1}`}
                  next
                  onClick={() => {
                    if (currentPage < pages - 1) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>
    <PaginationLink
      last
      href={`#page${pages }`}
      onClick={() => setCurrentPage(pages - 1)}
    >
      
    </PaginationLink>
  </PaginationItem>
            </Pagination>
            </nav>


            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;  
