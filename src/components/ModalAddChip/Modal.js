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
  Label,
    Alert } from 'reactstrap';

import {db} from '../../firebase'
import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';



function Modall(args) {
  const [modal, setModal] = useState(false);

  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validChip, setValidChip] = useState(false);
  

    const [nserie, setNserie] = useState('')
    const [linha, setLinha] = useState('')
    /* const [numero, setNumero] = useState('') */

   
  const toggle = () => {setModal(!modal)
                        setEmptyevalue(false)
                        setValidChip(false)
                        setNserie('')
                        setLinha('');}

                        
  /////////////////////////////////Função HandleAdd////////////////////////////

  async function handleAdd(){

    if ( !nserie|| !linha ){
      setEmptyevalue(true)
    }
    else{
     if(nserie.length<20){
      setValidChip(true)
    }else{


    await addDoc(collection(db,"Chip"),{
      linha: linha,
      nserie: nserie,
    })
    .then(()=>{
      toast.success('Chip cadastrado com sucesso')
      setNserie('')
      setLinha('')
      setEmptyevalue(false)
      setValidChip(false)
      toggle()
    })
    .catch((error)=>{
      toast.error('Algo deu errado, tente novamente mais tarde')
  
    });
  }
}
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////




  return (
    <div>

      <ToastContainer/>
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
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
                              setNserie(e.target.value);
                            }}
                            id="input-ModeloHt"
                            placeholder="Nº de série"
                            value={nserie}
                            onChange={(e)=>setNserie(e.target.value)}
                            type="text"
                            maxLength={20}
                          />
                          
                          {emptyevalue && nserie==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}
                          {validChip && nserie.length<20 &&  nserie.length>0 ? <Alert color='danger'>número de serie inválido</Alert> :''}

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
                          <Input type="select" name="select" id="SelectMarca" value={linha} onChange={(e)=>setLinha(e.target.value)}>
                            <option value=''>Escolha</option>
                            <option value='Vivo'>Vivo </option>
                          </Input>




                         {/*  <Input
                            className="form-control-alternative"
                            id="Marca-Ht"
                            placeholder="Marca"
                            value={linha}
                            onChange={(e)=> setLinha(e.target.value)}
                            type="text"
                          /> */}


                          {emptyevalue && linha ==='' ? <Alert color='danger'>Coloque a marca</Alert> :''}
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