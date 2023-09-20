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

  import { toast } from 'react-toastify';

  import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'
  import {db} from '../../firebase'

  

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [imei, setImei] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')

    //////////////validação/////////////
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validImei, setValidImei] = useState(false);
 //////////////////////////////////////////////// 

  const toggle = () => {
    setModal(!modal)
    setEmptyevalue(false)
    setValidImei(false) 
  };


  /////////////////////////////////função handleAdd/////////////////////////////////////

  async function handleAdd(){

    if ( !imei || !marca || !modelo ){
      setEmptyevalue(true)
    }else{if(imei.length<15){
      setValidImei(true)
    }else{

    await addDoc(collection(db,"Modem"),{
      imei: imei,
      marca:marca,
      modelo:modelo,
    })
    .then(()=>{
      toast.success("O modem foi adicionado com sucesso")
     
      setImei('')
      setModelo('')
      setMarca('')
      toggle()
    })
    .catch((error)=>{
      console.log(error)
      toast.error("ocorreu algum erro, tente novamente mais tarde")
  
    });
      }
    }
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
                            placeholder="IMEI"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei(e.target.value);
                            }}
                            type="text"
                            value={imei}
                            onChange={(e)=> setImei (e.target.value)}
                          />
                          {emptyevalue && imei==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}
                          {validImei && imei.length<15 &&  imei.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
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
                          {emptyevalue && marca==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}
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
                          {emptyevalue && modelo==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}
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