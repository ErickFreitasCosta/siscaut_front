import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form, Label, CardBody, Alert } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'

import { toast } from 'react-toastify';



function ModalEditModem(props) {
  const [modal, setModal] = useState(false);
 
  //////////////validação/////////////
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validImei, setValidImei] = useState(false);
 //////////////////////////////////////////////// 

  const toggle = () => {
    setModal(!modal)
    setEmptyevalue(false)
    setValidImei(false)

  };

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

      if ( !listaModem.imei || !listaModem.marca || !listaModem.modelo ){
        setEmptyevalue(true)
      }if(listaModem.imei.length<15){
        setValidImei(true)
      }else{if(imei.length<15){
        setValidImei(true)
      }else{

        const docRef = doc(db,'Modem',props.data.id)
        await updateDoc(docRef,{
            imei: listaModem.imei,
            marca:listaModem.marca,
            marca:listaModem.marca,
         
        })
        .then(()=>{
            console.log('Atualizado')
            toast.success("Os dados do modem foram alterados com sucesso")
            setImei('')
            setMarca('')
            setModelo('')
            toggle()

        })
        .catch((error)=>{
            console.log(error)

        })
      }
      }
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
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei(e.target.value);
                            }}
                            type="text"
                            value={listaModem.imei}
                            name='imei'
                            onChange={e =>handleSobreescrever(e)}
                          />
                          {emptyevalue && listaModem.imei==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}
                          {validImei && listaModem.imei.length<15 &&  listaModem.imei.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
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
                          {emptyevalue && listaModem.marca==='' ? <Alert color='danger'>Coloque a marca</Alert> :''}
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
                          {emptyevalue && listaModem.modelo==='' ? <Alert color='danger'>Coloque o modelo</Alert> :''}
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