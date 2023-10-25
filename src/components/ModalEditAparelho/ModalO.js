import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form, Alert } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc} from 'firebase/firestore'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ModalExample(props) {
  const [modal, setModal] = useState(false);

  //validação
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validImei, setValidImei] = useState(false);


  

  const toggle = () => {
    setModal(!modal)
    setModal(!modal)
    setEmptyevalue(false)
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


    const [,setModelo] = useState('');
    const [, setImei1] =   useState('')
    const [, setImei2] = useState('')
    const [, setMarca] = useState('')

    const [listaAparelho, setListaAparelho]= useState(props.data)
    
    async function editarPost(){
      const docRef = doc(db,'Aparelhos',props.data.id)
         if ( !listaAparelho.modelo|| !listaAparelho.imei1 ||!listaAparelho.imei2  || !listaAparelho.marca ){
      setEmptyevalue(true)
      
    }else{

      if(listaAparelho.imei1.length<15 || listaAparelho.imei2.length<15){
        setValidImei(true)
        
      }else{  

        await updateDoc(docRef,{
            modelo: listaAparelho.modelo,
            imei1:listaAparelho.imei1,
            imei2:listaAparelho.imei2,
            marca:listaAparelho.marca
        })
        .then(()=>{
          toast.success('Aparelho alterado com sucesso')
            setMarca('')
            setImei1('')
            setImei2('')
            setModelo('')
            toggle()

        })
        .catch(()=>{
            toast.error('erro ao alterar')

        })
      }
    }
  }
    function handleSobreescrever(e){
        setListaAparelho({...listaAparelho,[e.target.name] : e.target.value})

    }



  return (
    <div>
      <Button className='botaoEditar' size='sm' onClick={toggle}>
        Editar
      </Button>

      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Editar Aparelhos</ModalHeader>
        <ModalBody>

        <Form>
                  <h6 className="heading-small text-muted mb-4">Informações do Aparelho</h6>

                  <div className="pl-lg-4">

                    <Row>
                    <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Modelo
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Modelo"
                            type="text"

                            name = "modelo"
                            value={listaAparelho.modelo}
                            onChange={e =>handleSobreescrever(e)}
                     
                  />
                  {emptyevalue && listaAparelho.modelo==='' ? <Alert color='danger'>Coloque o modelo</Alert> :''}

                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username"> Marca </label>

                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Marca"
                            type="text"

                            name = "marca"
                            value={listaAparelho.marca}
                            onChange={e =>handleSobreescrever(e)}
                        
                           
                          />
                          {emptyevalue && listaAparelho.marca==='' ? <Alert color='danger'>Coloque a marca</Alert> :''}
                        </FormGroup>

                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            1º IMEI
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="IMEI"
                            type="text"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei2(e.target.value);
                            }}
                            name = "imei1"
                            value={listaAparelho.imei1}
                            onChange={e =>handleSobreescrever(e)}
                           
                          />
                          {emptyevalue && listaAparelho.imei1==='' ? <Alert color='danger'>Coloque o imei</Alert> :''}
                          {validImei && listaAparelho.imei1.length<15 &&  listaAparelho.imei1.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
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
                            placeholder="IMEI"
                            type="text"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei2(e.target.value);
                            }}
                            name = "imei2"
                            value={listaAparelho.imei2}
                            onChange={e =>handleSobreescrever(e)}
                      

                          />
                          {emptyevalue && listaAparelho.imei2==='' ? <Alert color='danger'>Coloque o segundo Imei</Alert> :''}
                          {validImei && listaAparelho.imei2.length<15 &&  listaAparelho.imei2.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    
                      
                    </Row>
                  </div>
              
                  
                </Form> 
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

export default ModalExample;