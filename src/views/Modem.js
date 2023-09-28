// /*!

// =========================================================
// * Argon Dashboard React - v1.2.3
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import {Link} from "react-router-dom";

// import { useState, useEffect } from "react";
// // node.js library that concatenates classes (strings)
// import classnames from "classnames";
// // javascipt plugin for creating charts
// import Chart from "chart.js";
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";


// //FirebsaeConfigs
// import {db} from '../firebase'
 
// import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'


// import ModalExcluir from '../components/ModalExcluir/ModalExcluir'
// import ModalEditModem from "components/ModalEditModem/ModalEditModem";

// // core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

// import Header from "components/Headers/Header.js";
// import Modall from "components/ModalAddModem/Modal";
// import { ToastContainer,toast } from 'react-toastify';

// const Modem = (props) => {
//   const [activeNav, setActiveNav] = useState(1);
//   const [chartExample1Data, setChartExample1Data] = useState("data1");


//   const [modens,setModens] = useState([])
//   const [renderizar,setRenderizar] = useState(false)

//   const [ListaModens,setListaModens] = useState([])
//   const [filteredModem,setFilteredModem] = useState([])
  



//   if (window.Chart) {
//     parseOptions(Chart, chartOptions());
//   }

//   const toggleNavs = (e, index) => {
//     e.preventDefault();
//     setActiveNav(index);
//     setChartExample1Data("data" + index);
//   };


//   ///////////////////////////////////////função excluir//////////////////////////////////////////////
// async function excluirModem(id){
//   /* alert("excluiu" + id) */
//   const excluDoc = doc(db, "Modem", id)
//   await deleteDoc(excluDoc)
//   .then(() =>{
//       toast.error("O modem foi excluido permanentemente")
//   })
// }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////




//   /////////////////////////////////////////função de exibição///////////////////////////// 
//   useEffect(()=>{
//     async function loadModens(){
//       const unsub = onSnapshot(collection(db,'Modem'), (snapshot)=>{
//         let listaModens = [];

//         snapshot.forEach((doc)=>{
//           listaModens.push({
//             id: doc.id,
//             imei: doc.data().imei,
//             marca: doc.data().marca,
//             modelo: doc.data().modelo
//           })
//         })
//         setModens(listaModens);
//       });

//     }
//       loadModens();

//   },[renderizar])
//   ////////////////////////////////////////////////////////////////////////////////


//   const [filter, setFilter] = useState([]);

//   function Pesquisa(e){
//    console.log(e)
   
//    const filteredModem = modens.filter(modens =>
//      modens.imei.toLowerCase().includes(e.toLowerCase())
//    );
//    console.log(filteredModem,"Modem")
//    if (filteredModem.length === 0) {
//      toast.error("Nenhum Aparelho foi encontrado");
     
//    } else {
//      setFilter(filteredModem);
//    }
//  }


 
//   return (
//     <>
//     <ToastContainer/>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         <Row>
    
//         </Row>
//         <Row className="mt-5">
//           <Col className="mb-5 mb-xl-0" xl="10">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Modem</h3>

//                     <input type="search" placeholder='Pesquisa por Imei' onChange={(e) => Pesquisa(e.target.value)} />

//                   </div>
//                   <div> 
//                     <Modall/>

                   
//                   </div>
//                   {/* <div className="col text-right">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       See all
//                     </Button>
//                   </div> */}
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Modelo</th>
//                     <th scope="col">Marca</th>
//                     <th scope="col">IMEI</th>
//                     <th scope="col">Ações</th>
//                   </tr>
//                 </thead>

//                 {filter.length > 0 ? 
//                 <tbody>


//                     {modens.map((modens)=>{
//                       return(

//                         <tr key={modens.id}>
//                         <th>{modens.modelo}</th>
//                         <th>{modens.marca}</th>
//                         <th>{modens.imei}</th>

//                         <td>
//                       <div> 

                    
         
//                         <div className="OrganizarBotoes">

                          
//                         <ModalEditModem data={modens}/>
//                           <ModalExcluir func={() => excluirModem(modens.id)} />
//                         </div>


//                         </div>
//                     </td>


//                         </tr>
                        
//                       )
//                     })}

                
              
               
                
                 
//                 </tbody>
// :
//                 <tbody>


// {modens.map((modens)=>{
//   return(

//     <tr key={modens.id}>
//     <th>{modens.modelo}</th>
//     <th>{modens.marca}</th>
//     <th>{modens.imei}</th>

//     <td>
//   <div> 



//     <div className="OrganizarBotoes">

      
//     <ModalEditModem data={modens}/>
//       <ModalExcluir func={() => excluirModem(modens.id)} />
//     </div>


//     </div>
// </td>


//     </tr>
    
//   )
// })}






//                 </tbody>

// }

//               </Table>
//             </Card>
//           </Col>
         




//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Modem;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
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
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
  deleteDoc,
  collection,
} from "firebase/firestore";
import ModalExcluir from '../components/ModalExcluir/ModalExcluir';
import ModalEditModem from "components/ModalEditModem/ModalEditModem";
import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddModem/Modal";
import { ToastContainer, toast } from 'react-toastify';

import './index.css'
import ClientesPDF from "components/RepostPdf/ClientesModem";


import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";



const Modem = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [modens, setModens] = useState([]);
  const [renderizar, setRenderizar] = useState(false);
  const [filter, setFilter] = useState([]);
  

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };


  useEffect(() => {
    async function loadModens() {
      const unsub = onSnapshot(collection(db, 'Modem'), (snapshot) => {
        let listaModens = [];

        snapshot.forEach((doc) => {
          listaModens.push({
            id: doc.id,
            imei: doc.data().imei,
            marca: doc.data().marca,
            modelo: doc.data().modelo,
          });
        });
        setModens(listaModens);
      });
    }
    loadModens();
  }, [renderizar]);


  async function excluirModem(id) {
    const excluDoc = doc(db, "Modem", id);
    await deleteDoc(excluDoc)
      .then(() => {
        toast.error("O modem foi excluído permanentemente");
      })
      .catch((error) => {
        toast.error("Algo deu errado, tente novamente mais tarde");
        setRenderizar(!renderizar);
        setFilter([]);
      });
  }



  function Pesquisa(e){
   console.log(e)
   
   const filteredAparelhos = modens.filter(Modem =>
     Modem.imei.toLowerCase().includes(e.toLowerCase())
   );
   console.log(filteredAparelhos,"APARELJP")
   if (filteredAparelhos.length === 0) {
     toast.error("Nenhum Aparelho foi encontrado");
     
   } else {
     setFilter(filteredAparelhos);
   }
 }

  return (
    <>
      <ToastContainer />
      <Header />
      <Container className="mt--7" fluid>
        <Row>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                <div className="conteinerSearch">
  
                    <div className="col divADICIONAR">
                      <h3 className="mb-0">Modem</h3>
                      <input type="search" placeholder='Pesquisa por IMEI' onChange={(e) => Pesquisa(e.target.value)} />
                    </div>

                    <div className="divADICIONAR btn" style={{justifyContent : "space-between"}}>
                      <Modall />

  {/* ////////////////////////////////////////////////////GERAR PDF */}
                      <Button color="danger" onClick={(e) => ClientesPDF(modens)}><i class="far fa-file-pdf"></i> Gerar PDF</Button>{' '}
                    </div>

                </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Modelo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filter.length > 0 ?
                    filter.map((modem) => {
                      return (
                        <tr key={modem.id}>
                          <th>{modem.modelo}</th>
                          <th>{modem.marca}</th>
                          <th>{modem.imei}</th>
                          <td>
                            <div className="OrganizarBotoes">
                              <ModalEditModem data={modem} />
                              <ModalExcluir func={() => excluirModem(modem.id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    }) :
                    modens.map((modem) => {
                      return (
                        <tr key={modem.id}>
                          <th>{modem.modelo}</th>
                          <th>{modem.marca}</th>
                          <th>{modem.imei}</th>
                          <td>
                            <div className="OrganizarBotoes">
                              <ModalEditModem data={modem} />
                              <ModalExcluir func={() => excluirModem(modem.id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Modem;
