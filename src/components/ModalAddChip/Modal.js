import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Spinner,
} from "reactstrap";

import { db } from "../../firebase";
import { query, where, getDocs, addDoc, collection } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modall(args) {
  //controle do modal
  const [modal, setModal] = useState(false);

  //states para validação
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validChip, setValidChip] = useState(false);

  //states para pegar os valores dos inputs
  const [nserie, setNserie] = useState("");
  const [linha, setLinha] = useState("");
  const [numero, setNumero] = useState("");

  //State para loading
  const [loadingAdd, setLoadingAdd] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setEmptyevalue(false);
    setValidChip(false);
    setNserie("");
    setLinha("");
    setNumero("");
  };

  /////////////////////////////////Função HandleAdd////////////////////////////

  async function handleAdd() {
    setLoadingAdd(true);
    try {
      //criação da query/consulta para verificar se o rg digitado existe no banco
      const q = query(collection(db, "Chip"), where("nserie", "==", nserie));

      //execução da query/consulta
      const querySnapshot = await getDocs(q);

      //pegando os resultados encontrados
      const resultado = querySnapshot.docs;

      if (!nserie || !linha || !numero) {
        setEmptyevalue(true);
      } else {
        if (nserie.length < 20 || numero.length < 11) {
          setValidChip(true);
        } else {
          if (resultado.length > 0) {
            toast.error("Já existe um chip com este número de série", {
              position: "bottom-center",
            });
            
          } else {
            await addDoc(collection(db, "Chip"), {
              linha: linha,
              nserie: nserie,
              numero: numero,
              cautelado: false,
            })

              toast.success("Chip foi adicionado com sucesso");
                setNserie("");
                setLinha("");
                setNumero("");
                setEmptyevalue(false);
                setValidChip(false);
                toggle();
             
          }
        }
      }
    } catch (error){
      toast.error("Algo deu errado, tente novamente mais tarde");
    }finally {
      setLoadingAdd(false);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <ToastContainer />
      <Button size="sm" color="success" onClick={toggle}>
        Adicionar
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar</ModalHeader>
        <ModalBody>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Informações Chip
              </h6>

              <div className="pl-lg-4">
                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-NserieHT"
                      >
                        Nº de Série
                      </label>
                      <Input
                        className="form-control-alternative"
                        /* defaultValue="lucky.jesse" */
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 20);
                          setNserie(e.target.value);
                        }}
                        id="input-ModeloHt"
                        placeholder="Nº de série"
                        value={nserie}
                        onChange={(e) => setNserie(e.target.value)}
                        type="text"
                        maxLength={20}
                      />

                      {emptyevalue && nserie === "" ? (
                        <Alert color="danger">Coloque o número de serie</Alert>
                      ) : (
                        ""
                      )}
                      {validChip && nserie.length < 20 && nserie.length > 0 ? (
                        <Alert color="danger">
                          número de serie inválido, são necessários 20 digitos!
                        </Alert>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-NserieHT"
                      >
                        Número do telefone
                      </label>
                      <Input
                        className="form-control-alternative"
                        /* defaultValue="lucky.jesse" */
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 11);
                          setNumero(e.target.value);
                        }}
                        id="input-Modelonumero"
                        placeholder="(00)00000-0000"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        type="text"
                        maxLength={11}
                      />

                      {emptyevalue && numero === "" ? (
                        <Alert color="danger">
                          Coloque o número do telefone
                        </Alert>
                      ) : (
                        ""
                      )}
                      {validChip && numero.length < 11 && numero.length > 0 ? (
                        <Alert color="danger">
                          número de telefone inválido, são necessários 11
                          digitos!
                        </Alert>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label className="form-control-label" htmlFor="Marca-Ht">
                        Marca
                      </label>
                      <Input
                        type="select"
                        name="select"
                        id="SelectMarca"
                        value={linha}
                        onChange={(e) => setLinha(e.target.value)}
                      >
                        <option value="">Escolha</option>
                        <option value="Claro">Claro </option>
                      </Input>

                      {/*  <Input
                            className="form-control-alternative"
                            id="Marca-Ht"
                            placeholder="Marca"
                            value={linha}
                            onChange={(e)=> setLinha(e.target.value)}
                            type="text"
                          /> */}

                      {emptyevalue && linha === "" ? (
                        <Alert color="danger">Coloque a marca.</Alert>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
          {loadingAdd ? (<><Spinner size="sm" color="primary"></Spinner>{" "}<span>Salvando</span></>) :
            (
              "Salvar"
            )}
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modall;
