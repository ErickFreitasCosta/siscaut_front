import { useState, useEffect } from "react";
import Chart from "chart.js";
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
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddChip/Modal";
import ModalEditChip from "components/ModalEditChip/ModalEditChip";
import ModalExcluir from "components/ModalExcluir/ModalExcluir";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "firebase/firestore";



const Chip = (props) => {
  const [filter, setFilter] = useState([]);
  const [renderizar, setRenderizar] = useState(false);
  const [chip, setChip] = useState([]);
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

  useEffect(() => {
    async function loadChips() {
      const unsub = onSnapshot(collection(db, "Chip"), (snapshot) => {
        let listaChips = [];

        snapshot.forEach((doc) => {
          listaChips.push({
            id: doc.id,
            nserie: doc.data().nserie,
            linha: doc.data().linha,
          });
        });
        setChip(listaChips);
      });
    }
    loadChips();
  }, [renderizar]);

  async function excluirChip(id) {
    const excluDoc = doc(db, "Chip", id);
    await deleteDoc(excluDoc)
      .then(() => {
        toast.error("O chip foi excluído permanentemente");
      })
      .catch((error) => {
        toast.error("Algo deu errado, tente novamente mais tarde");
        setRenderizar(!renderizar);
        setFilter([]);
      });
  }

  ///////////////////////////////////////
  function Pesquisa(e) {
    console.log(e);

    const filteredChip = chip.filter((chip) =>
      chip.nserie.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredChip, "Chip");
    if (filteredChip.length === 0) {
      toast.error("Nenhum chip foi encontrado");
      
    } else {
      setFilter(filteredChip);
    }
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row></Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">

                <div className="conteinerSearch">
                      <div className="col divADICIONAR">
                        <h3 className="mb-0">CHIP</h3>
                        <input
                          type="search"
                          placeholder="Pesquisa por Imei"
                          onChange={(e) => Pesquisa(e.target.value)}
                        />
                      </div>

                      <div className="divADICIONAR" style={{justifyContent : "flex-end"}}>
                        <Modall />
                      </div>
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
                {filter.length > 0 ? (
                  <tbody>
                    {filter.map((chip) => {
                      return (
                        <tr key={chip.id}>
                          <th scope="row">{chip.nserie}</th>
                          <th scope="row">{chip.linha}</th>
                          <td>

                            <div className="OrganizarBotoes">
                              <ModalEditChip data={chip} />
                              <ModalExcluir func={() => excluirChip(chip.id)} />

                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody>
                    {chip.map((chip) => {
                      return (
                        <tr key={chip.id}>
                          <th scope="row">{chip.nserie}</th>
                          <th scope="row">{chip.linha}</th>
                          <td>
                            <div className="OrganizarBotoes">
                              <ModalEditChip data={chip} />
                              <ModalExcluir func={() => excluirChip(chip.id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chip;
