import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'



function ModalExample(props) {
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


    const [modelo,setModelo] = useState('');
    const [imei1, setImei1] =   useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')

    const [idAparelho, setIdAparelho]= useState('')

    const [listaAparelho, setListaAparelho]= useState(props.data)
    
    async function editarPost(){
        if(!listaAparelho.marca ) {
            return alert("DIGTE A MARCA")
        }

        const docRef = doc(db,'Aparelhos',props.data.id)
        await updateDoc(docRef,{
            modelo: listaAparelho.modelo,
            imei1:listaAparelho.imei1,
            imei2:listaAparelho.imei2,
            marca:listaAparelho.marca
        })
        .then(()=>{
            console.log('Atualizado')
            setMarca('')
            setImei1('')
            setImei2('')
            setModelo('')
            toggle()

        })
        .catch(()=>{
            console.log('Erro ao atualizar')

        })
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

                            name = "imei1"
                            value={listaAparelho.imei1}
                            onChange={e =>handleSobreescrever(e)}
                           
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
                            placeholder="IMEI"
                            type="text"

                            name = "imei2"
                            value={listaAparelho.imei2}
                            onChange={e =>handleSobreescrever(e)}
                      

                          />
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