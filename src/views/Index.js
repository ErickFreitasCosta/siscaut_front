import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getDocs, doc, deleteDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Header from "components/Headers/Header.js";
import ModalAddMilitar from "components/ModalAddUser/Modal";
import ModalExcluir from '../components/ModalExcluir/ModalExcluir';
import ModalEditUser from '../components/ModalEditUser/ModalEditUser';
import { chartOptions, parseOptions } from "variables/charts.js";

const Index = (props) => {
  const [militares, setMilitares] = useState([]);
  const [filter, setFilter] = useState([]);
  const [renderizar, setRenderizar] = useState(false);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }


 //////////////////////FUNÇÃO DE EXCLUir
  async function excluirMilitar(id) {
    const RefMilitar = doc(db, "Militares", id);
    const q = query(collection(db, "Cautelas"), where("militar", "==", id));
    const querySnapshot = await getDocs(q);
   try{
    if (querySnapshot.size > 0) {
      toast.error(
        "Este militar esta relacionado a uma ou mais cautelas, não é possível excluí-lo!",
        {
          position: "bottom-center",
        }
      );
    } else {
      await deleteDoc(RefMilitar)
      .then(() => {
        toast.error("O militar foi excluído permanentemente");
      });
      setRenderizar(!renderizar)
      setFilter([])
    }
  } catch(error){
    console.error("Ocorreu um erro:", error);
    toast.error("Algo deu errado, tente novamente mais tarde");
  }
   
  }

  /////////////////////FUNÇÃO DE EXIBIÇÃO 
  useEffect(() => {
    async function loadMilitares() {
      const unsub = onSnapshot(collection(db, 'Militares'), (snapshot) => {
        let listaMilitares = [];

        snapshot.forEach((doc) => {
          listaMilitares.push({
            id: doc.id,
            funcao: doc.data().funcao,
            nome: doc.data().nome,
            postgrad: doc.data().postgrad,
            rg: doc.data().rg,
            unidade: doc.data().unidade
          });
        });

        setMilitares(listaMilitares);
      });

      return unsub; // Clean up the snapshot listener
    }
    
    loadMilitares();
  }, [renderizar]); // Load data once on initial render



  // useEffect(() => {
  //   if (filter.trim() === "") {
  //     return; // No need to filter when the input is empty
  //   }

  //   // Filter military personnel based on RG
  //   const filteredMilitares = militares.filter((militar) =>
  //     militar.rg.toLowerCase().includes(filter.toLowerCase())
  //   );

  //   if (filteredMilitares.length === 0) {
  //     toast.error("Nenhum militar foi encontrado");
  //   }

  //   setMilitares(filteredMilitares);
  // }, [filter]);
  function Pesquisa(e){
    console.log(e)
    
    const filteredMilitares = militares.filter(militar =>
      militar.rg.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredMilitares,"APARELJP")
    if (filteredMilitares.length === 0) {
      toast.error("Nenhum Aparelho foi encontrado");
      
    } else {
      setFilter(filteredMilitares);
    }
  }




  return (
    <>
      <ToastContainer/>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">

                  <div className="conteinerSearch">
                    <div className="col col divADICIONAR">
                      <h3 className="mb-0">Militares</h3>
                      <input
                        type="search"
                        placeholder='Pesquisa por RG'
                        
                        onChange={(e) => Pesquisa(e.target.value)}
                      />
                    </div>
                    <div className="divADICIONAR" style={{justifyContent : "flex-end"}}>
                      <ModalAddMilitar/>
                    </div>
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Rg</th>
                    <th scope="col">Posto/Grad</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">Função</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {filter.length > 0 ?
                <tbody>
                  {filter.map((militar) => (
                    <tr key={militar.id}>
                      <th>{militar.nome}</th>
                      <th>{militar.rg}</th>
                      <th>{militar.postgrad}</th>
                      <th>{militar.unidade}</th>
                      <th>{militar.funcao}</th>
                      <td>
                        <div className="OrganizarBotoes">
                          <ModalEditUser data={militar} />
                          <ModalExcluir func={() => excluirMilitar(militar.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
:
                <tbody>
                  {militares.map((militar) => (
                    <tr key={militar.id}>
                      <th>{militar.nome}</th>
                      <th>{militar.rg}</th>
                      <th>{militar.postgrad}</th>
                      <th>{militar.unidade}</th>
                      <th>{militar.funcao}</th>
                      <td>
                        <div className="OrganizarBotoes">
                          <ModalEditUser data={militar} />
                          <ModalExcluir func={() => excluirMilitar(militar.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default Index;
