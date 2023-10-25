/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import "./ModalDescaut.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function Modall(props) {
  const [modal, setModal] = useState(false);
  const [idChip, setIdChip] = useState("");
  const [nunChip, setNunChip] = useState("");
  const [idMilitar, setIdMilitar] = useState("");
  const [nomeMilitar, setNomeMilitar] = useState("");
  const [listaAparelhos] = useState(props.data);
  const [loading,setLoading] = useState(false)

  const toggle = () => {
    setModal(!modal);
  };

  ///////////////////////////////////////Pegar Número do Chip Cautelado/////////////////////////////////

  useEffect(() => {
    async function chipCautelado() {
      try {
        const q = query(
          collection(db, "Cautelas"),
          where("aparelho", "==", props.data.id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // Para cada documento retornado pela consulta

          const valorDoCampo = doc.data().chip; // 'chip' é o nome do campo que você deseja recuperar
          setIdChip(valorDoCampo);
        });

        // Após definir idChip, você pode chamar getNumero() aqui

        if (idChip) {
          getNumero();
        }
      } catch (error) {
        console.error("Erro ao consultar documento:", error);
      }
    }
    chipCautelado();
  }, [modal]);

  async function getNumero() {
    try {
      const docRef = doc(db, "Chip", idChip);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // O documento existe
        const numero = docSnap.data().numero;
        setNunChip(numero);
      } else {
        // O documento não existe
        console.log("O documento não foi encontrado.");
      }
    } catch (error) {
      // Trate erros aqui
      console.error("Erro ao obter o número:", error);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////Pegar o nome do Militar//////////////////////////////

  useEffect(() => {
    async function NomeMilitar() {
      try {
        const q = query(
          collection(db, "Cautelas"),
          where("aparelho", "==", props.data.id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // Para cada documento retornado pela consulta

          const valorDoCampo = doc.data().militar; // 'militar' é o nome do campo que você deseja recuperar
          setIdMilitar(valorDoCampo);
        });

        // Após definir idMilitar, você pode chamar getNumero() aqui

        if (idMilitar) {
          getNomeMilitar();
        }
      } catch (error) {
        console.error("Erro ao consultar documento:", error);
      }
    }
    NomeMilitar();
  }, [modal]);

  async function getNomeMilitar() {
    try {
      const docRef = doc(db, "Militares", idMilitar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // O documento existe
        const nome = docSnap.data().nome;
        setNomeMilitar(nome);
      } else {
        // O documento não existe
        console.log("O documento não foi encontrado.");
      }
    } catch (error) {
      // Trate erros aqui
      console.error("Erro ao obter o nome:", error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////FUNÇÃO DE DESCAUTELA/////////////////////////////////////

  async function HandleDescautelar() {
    setLoading(true)


    const dataAtual = new Date();
    const docAparelho = doc(db, "Aparelhos", props.data.id);
    const docChip = doc(db, "Chip", idChip);
    const docMilitar = doc(db, "Militares", idMilitar);

    ////////////////////////////////////Para fazer o update/////////////////////////////////
    const q = query(
      collection(db, "Cautelas"),
      where("aparelho", "==", props.data.id)
    );

    const querySnapshot = await getDocs(q);

    // Array para armazenar os dados que vão ser atualizados
    let dadosParaUpdate = [];

    querySnapshot.forEach((doc) => {
      // Obter os dados do documento
      const data = doc.data();

      // Adiciona os dados ao array
      dadosParaUpdate.push({
        id: doc.id, // ID do documento
        dados: data, // Dados do documento
        date_caut: doc.data().date_caut // pega o date_caut
      });
    });
    let datacautela;
    let DocRefCaut
    ////////////////////////////////////////////////////////////////////

    const [docSnapChip, docSnapMilitar, docSnapAparelho] = await Promise.all([
      getDoc(docChip),
      getDoc(docMilitar),
      getDoc(docAparelho)
    ]);
    try {
      dadosParaUpdate.forEach(async (documento) => {
        const { id, date_caut } = documento; // Desestrutura o objeto para obter o ID e os dados

        // Faz o updateDoc aqui usando os dados e o ID do documento
        const docRef = doc(db, "Cautelas", id);
        /* await updateDoc(docRef, {
          cautela: false,
        }); */
        datacautela = date_caut;
        DocRefCaut = docRef
      });

      await updateDoc(docAparelho, {
        cautelado: false,
      });

      await updateDoc(docChip, {
        cautelado: false,
      });

      await addDoc(collection(db, "Devolucoes_aparelhos"), {
        numero: docSnapChip.data().numero,
        linha: docSnapChip.data().linha,
        nserie: docSnapChip.data().nserie,
        funcao: docSnapMilitar.data().funcao,
        nome: docSnapMilitar.data().nome,
        postgrad: docSnapMilitar.data().postgrad,
        rg: docSnapMilitar.data().rg,
        unidade: docSnapMilitar.data().unidade,
        imei1: docSnapAparelho.data().imei1,
        imei2: docSnapAparelho.data().imei2,
        marca: docSnapAparelho.data().marca,
        modelo: docSnapAparelho.data().modelo,
        date_devolu: dataAtual.toISOString(),
        date_caut: datacautela,
      });

      await deleteDoc(DocRefCaut)

      toast.success("O aparelho foi descautelado ");
      toggle();
      //
    } catch (error) {
      // erros
      toast.error("occoreu um erro", error)
      console.error("Ocorreu um erro:", error);
    }finally {
      setLoading(false)
      
      
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button size="sm" color="success" onClick={toggle}>
        <i className="fa-solid fa-circle-info"></i>
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Informações</ModalHeader>
        <ModalBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Cautela de Aparelho
            </h6>
            <div className="pl-lg-1">
              <Row>
                <Col lg="10">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Responsável
                    </label>
                    <Input
                      type="select"
                      id="SelectResponsavel"
                      disabled
                      /* value={idMilitar} onChange={(e)=>setIdMilitar(e.target.value)} */
                    >
                      <option value="">{nomeMilitar}</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col lg="10">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Chip
                    </label>
                    <Input
                      type="select"
                      id="SelectResponsavel"
                      disabled /* onChange='{(e)=>setIdChip(e.target.value)}' */
                      /* value='{idChip}'  */
                    >
                      <option value="">{nunChip}</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Modelo
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-last-name"
                      disabled
                      placeholder="Modelo"
                      type="text"
                      value={listaAparelhos.modelo}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Marca
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      disabled
                      value={listaAparelhos.marca}
                      placeholder="Marca"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-email">
                      1º IMEI
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="IMEI"
                      value={listaAparelhos.imei1}
                      disabled
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      2º IMEI
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-first-name"
                      disabled
                      value={listaAparelhos.imei2}
                      placeholder="IMEI"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            {/* Address */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={HandleDescautelar}>
          {loading ? (<><Spinner size="sm" color="primary"></Spinner>{" "}<span>Descautelando</span></>) :
            (
              "Descautelar"
            )}
          </Button>

          <Button
            className="btn_gerarPdf_Descaut"
            color="danger"
            onClick={toggle}
          >
            <i className="far fa-file-pdf"></i> Gerar PDF
          </Button>
          {/* {' '} */}
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modall;