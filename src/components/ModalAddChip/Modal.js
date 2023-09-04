import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  Label } from 'reactstrap';

import {db} from '../../firebase'
import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'



function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [nserie, setNserie] = useState('')
    const [linha, setLinha] = useState('')
    const [numero, setNumero] = useState('')

   
  const toggle = () => setModal(!modal);


  /////////////////////////////////Função HandleAdd////////////////////////////

  async function handleAdd(){

    await addDoc(collection(db,"Chip"),{
      linha: linha,
      nserie: nserie,
    })
    .then(()=>{
      console.log("conseguiu")
      setNserie('')
      setLinha('')
      toggle()
    })
    .catch((error)=>{
      console.log(error)
  
    });
  } 




  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
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
                            id="input-ModeloHt"
                            placeholder="Nº de série"
                            value={nserie}
                            onChange={(e)=>setNserie(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="Marca-Ht"
                          >
                            Marca
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="Marca-Ht"
                            placeholder="Marca"
                            value={linha}
                            onChange={(e)=> setLinha(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      
                    </Row>
                    
                  </div>
                  
                </Form>
              </CardBody>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
            Adicionar
          </Button>{' '}
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Modall;