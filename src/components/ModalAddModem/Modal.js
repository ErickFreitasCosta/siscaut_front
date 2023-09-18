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
    Alert,
  Label } from 'reactstrap';

  import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'
  import {db} from '../../firebase'

  

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [imei, setImei] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')


  const toggle = () => setModal(!modal);


  /////////////////////////////////função handleAdd/////////////////////////////////////

  async function handleAdd(){

    await addDoc(collection(db,"Modem"),{
      imei: imei,
      marca:marca,
      modelo:modelo,
    })
    .then(()=>{
      console.log("conseguiu")
      setImei('')
      setModelo('')
      setMarca('')
      toggle()
    })
    .catch((error)=>{
      console.log(error)
  
    });
  } 
/////////////////////////////////////////////////////////////////////////////////////////////////





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
                    Informações Modem
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="11">

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-imeiModem"
                          >
                            IMEI
                          </label>
                          <Input
                            className="form-control-alternative"
                            /* defaultValue="lucky.jesse" */
                            id="input-imeiModem"
                            placeholder="Nº de serie"
                            type="text"
                            value={imei}
                            onChange={(e)=> setImei (e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col lg="11">

                        {/* <FormGroup>
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
                            type="text"
                            value={marca}
                            onChange={(e)=> setMarca (e.target.value)}
                          />
                        </FormGroup> */}

                     <FormGroup>
                          <Label for="exampleSelect">Marca</Label>
                          <Input type="select" name="select" id="exampleSelect" value={marca} onChange={(e)=>setMarca(e.target.value)}>
                            <option value=''>Escolha</option>
                            <option value='Claro'>Claro </option>
                          </Input>
                      </FormGroup>

                      </Col>
                      </Row>

                      <Row>

                      <Col lg="11">
                        <FormGroup>
                        <Label for="SelectMarca">Modelo</Label>
                          <Input type="select" name="select" id="SelectMarca" value={modelo} onChange={(e)=>setModelo(e.target.value)}>
                            <option value=''>Escolha</option>
                            <option value='Marca 1'>Marca 1 </option>
                            <option value='Marca 2'>Marca 2 </option>
                           
                          </Input>
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
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modall;