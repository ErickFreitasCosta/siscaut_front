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
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import "./index.css";
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { format } from "date-fns";

import { db } from "../firebase";
import {
  doc,
  setDoc,
  Collection,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

import ClientesPDF from "components/RepostPdf/pdfDevolucao/index";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";


const DevolucoesAparelho = (props) => {
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

  const [loading, setLoading] = useState(false);
  const [renderizar, setRenderizar] = useState(false);

  const [cautelas, setCautelas] = useState([]);

  const [cautInf, setCautInf] = useState([]);
  
  const DecoluCollectionsRef = collection(db, "Devolucoes_aparelhos")
  const [devolucoes, setDevolucoes] = useState([]);


  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(devolucoes.length / itensPerPage)
  const startIndex= currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = devolucoes.slice(startIndex, endIndex)

  useEffect(() =>{

  async function loadDevolucoes(){
    setLoading(true)
    try{
  const data = await getDocs(DecoluCollectionsRef)
  const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id,
    date_caut: format(Date.parse(doc.data().date_caut), 'dd/MM/yyyy'),
        date_devolu: format(Date.parse(doc.data().date_devolu), 'dd/MM/yyyy')}))
  setDevolucoes(response)
  }catch (error) {
    console.error('Erro ao buscar informações:', error);
  } finally {
    setLoading(false)
  }

  }

  loadDevolucoes()
},[])
 


///////////////////////////////////// FUNÇÃO PESQUISA  ////////////////////////////////////////////////
const [filter, setFilter] = useState([]);

function Pesquisa(e){
 
 
 const filteredmilitar = devolucoes.filter(devolucoes =>
  devolucoes.rg.toLowerCase().includes(e.toLowerCase())
 );
 console.log(filteredmilitar,"APARELJP")
 if (filteredmilitar.length === 0) {
   toast.error("Nenhum militar foi encontrado");
   
 } else {
   setFilter(filteredmilitar);
 }
}
// ____________________________________________________________________________________________________________





  /* useEffect(() => {
    async function getCautelados() {
      setLoading(true);
      try {
        const cauteladosQuery = query(
          collection(db, "Cautelas"),
          where("cautela", "==", false)
        );
        const data = await getDocs(cauteladosQuery);
        const response = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCautelas(response);
      } catch (error) {
        console.error("Erro ao buscar cautelas:", error);
      }
    }

    getCautelados();
  }, []); */
  
  /* useEffect(() => {
    async function getInfCaut() {

      try {
        const listaPromises = cautelas.map(async (cautela) => {
          const docRefChip = doc(db, "Chip", cautela.chip);
          const docRefMilitar = doc(db, "Militares", cautela.militar);
          const docRefAparelho = doc(db, "Aparelhos", cautela.aparelho);

          const [docSnapChip, docSnapMilitar, docSnapAparelho] =
            await Promise.all([
              getDoc(docRefChip),
              getDoc(docRefMilitar),
              getDoc(docRefAparelho),
            ]);

          // Formate a data usando o date-fns
          const formattedDateCaut = format(
            Date.parse(cautela.date_caut),
            "dd/MM/yyyy"
          );
          const formattedDateDevolu = format(
            Date.parse(cautela.date_devolu),
            "dd/MM/yyyy"
          );

          return {
            id: cautela.id,
            date_caut: formattedDateCaut,
            date_devolu: formattedDateDevolu,
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
        console.error("Erro ao buscar informações:", error);
      } finally {
        setLoading(false);
      }
    }

    if (cautelas.length > 0) {
      getInfCaut();
    }
  }, [cautelas]); */
  






/*  console.log(cautInf) */


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
      <ToastContainer />
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row></Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                <div className="conteinerSearch">
                    <div className="col divADICIONAR">
                      <h3 className="mb-0">Devoluções de Aparelhos</h3>
                      <input type="search" placeholder='Pesquisa por rg' onChange={(e) => Pesquisa(e.target.value)} />
                     </div>
    
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr className="justificar">
                    <th scope="col">Militar</th>
                    <th scope="col">Rg</th>
                    <th scope="col" className="ajeitar">
                      Aparelho
                    </th>
                    <th scope="col" className="ajeitar">
                      Imei
                    </th>
                    <th scope="col" className="ajeitar">
                      Número
                    </th>
                    <th scope="col" className="ajeitar">
                      Data cautela
                    </th>
                    <th scope="col" className="ajeitar">
                      Data Devolução
                    </th>
                    <th scope="col" className="ajeitar">
                      Ações
                    </th>
                  </tr>
                </thead>

                {filter.length > 0 ? 
                <tbody>
                   
                   {filter.map((infcauts) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={infcauts.id}>
                        
                      <th scope="row">{infcauts.nome}</th>
                      <th scope="row">{infcauts.rg}</th>
                      <th scope="row">{infcauts.post}</th>
                      <th scope="row">{infcauts.imei1}</th>
                      <th scope="row">{infcauts.numero}</th>
                      <th scope="row">{infcauts.date_caut}</th>
                      <th scope="row">{infcauts.date_devolu}</th>
                      <td>
                        
                        <div>
                          <div className="OrganizarBotoes">
                            <Button
                              size="sm"
                              className="btn_gerarPdf_Descaut"
                              color="danger"
                              onClick={(e) =>

                                ClientesPDF({
                                  idClicked: infcauts.id,

                                  name: infcauts.nome,
                                  rg: infcauts.rg,
                                  modelo: infcauts.modelo,
                                  imei1: infcauts.imei1,
                                  imei2: infcauts.imei2,
                                  numero: infcauts.numero,
                                  data: infcauts.date_caut,
                                  data_des: infcauts.date_devolu,
                                  marca: infcauts.marca

                                  ,
                                  funcao: infcauts.funcao,


                                  unidade: infcauts.unidade,
                                  fiscal: infcauts.fiscal_devolu,
                                  postgrad: infcauts.postgrad

                                })
                              }
                            >
                              <i className="far fa-file-pdf"></i> Gerar PDF
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    )
                   })}


                </tbody>
                :
                <tbody>
                   
                   {currentItens.map((infcauts) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={infcauts.id}>
                        
                        <th scope="row">{infcauts.nome}</th>
                        <th scope="row">{infcauts.rg}</th>
                        <th scope="row">{infcauts.post}</th>
                        <th scope="row">{infcauts.imei1}</th>
                        <th scope="row">{infcauts.numero}</th>
                        <th scope="row">{infcauts.date_caut}</th>
                        <th scope="row">{infcauts.date_devolu}</th>
                        <td>
                          
                          <div>
                            <div className="OrganizarBotoes">
                              <Button
                                size="sm"
                                className="btn_gerarPdf_Descaut"
                                color="danger"
                                onClick={(e) =>

                                  ClientesPDF({
                                    idClicked: infcauts.id,

                                    name: infcauts.nome,
                                    rg: infcauts.rg,
                                    modelo: infcauts.modelo,
                                    imei1: infcauts.imei1,
                                    imei2: infcauts.imei2,
                                    numero: infcauts.numero,
                                    data: infcauts.date_caut,
                                    data_des: infcauts.date_devolu,
                                    marca: infcauts.marca

                                    ,
                                    funcao: infcauts.funcao,


                                    unidade: infcauts.unidade,
                                    fiscal: infcauts.fiscal_devolu,
                                    postgrad: infcauts.postgrad

                                  })
                                }
                              >
                                <i className="far fa-file-pdf"></i> Gerar PDF
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>

}






               
              </Table>
              {loading ? (
                <div className="centralizar_load">
                  <Spinner
                    color="primary"
                    style={{
                      height: "3rem",
                      width: "3rem",
                    }}
                  >
                    Loading...
                  </Spinner>
                </div>
              ) : (
                ""
              )}

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

export default DevolucoesAparelho;
