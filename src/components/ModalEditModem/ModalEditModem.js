import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form, Label, CardBody } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'



function ModalEditModem(props) {
  const [modal, setModal] = useState(false);
  console.log('aqui',props)

  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggle}
    >
      &times;
    </button>
  );


  const [imei, setImei] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')


    const [listaModem, setListaModem]= useState(props.data)
    
    async function editarPost(){

        const docRef = doc(db,'Modem',props.data.id)
        await updateDoc(docRef,{
            imei: listaModem.imei,
            marca:listaModem.marca,
            marca:listaModem.marca,
         
        })
        .then(()=>{
            console.log('Atualizado')
            setImei('')
            setMarca('')
            setModelo('')
            toggle()

        })
        .catch(()=>{
            console.log('Erro ao atualizar')

        })
    }

    function handleSobreescrever(e){
        setListaModem({...listaModem,[e.target.name] : e.target.value})

    }



  return (
    <div>
      <Button className='botaoEditar' size='sm' onClick={toggle}>
        Editar
      </Button>

      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Editar Aparelhos</ModalHeader>
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
                            value={listaModem.imei}
                            name='imei'
                            onChange={e =>handleSobreescrever(e)}
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
                          <Input type="select"  id="exampleSelect" 
                          value={listaModem.marca}
                          name='marca'
                          onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Marca 1'>Marca 1 </option>
                            <option value='Marca 2'>Marca 2 </option>
                            <option value='Marca 3'>Marca 3 </option>
                            <option value='Marca 4'>Marca 4 </option>
                            <option value='Marca 5'>Marca 5 </option>
                          </Input>
                      </FormGroup>

                      </Col>
                      </Row>

                      <Row>

                      <Col lg="11">
                        <FormGroup>
                        <Label for="SelectMarca">Modelo</Label>
                          <Input type="select" id="SelectMarca" 
                           value={listaModem.modelo}
                           name='modelo'
                           onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Claro'>Claro</option>
                            
                          </Input>
                        </FormGroup>
                      </Col>
                            </Row>
                   
                    
                  </div>
                  
                </Form>
              </CardBody>
       
        </ModalBody>

     
        <ModalFooter>
          <Button color="success"  onClick={editarPost}>
            Salvar
          </Button>{' '}

          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEditModem;