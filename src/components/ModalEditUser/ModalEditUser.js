import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'



function ModalEditUser(props,renderizar,setRenderizar,filter,setFilter) {
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



    const [listaMilitar, setListaMilitar]= useState(props.data)
    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState('')
    const [rg, setRg] = useState('')
    const [unidade, setUnidade] = useState('')
    const [postgrad, setPostgrad] = useState('')

  
    

    async function editarPost(){

        const docRef = doc(db,'Militares',props.data.id)
        await updateDoc(docRef,{
          nome: listaMilitar.nome,
          funcao: listaMilitar.funcao,
          rg:listaMilitar.rg,
          unidade: listaMilitar.unidade,
          postgrad: listaMilitar.postgrad,
         
        })
        .then(()=>{
            console.log('Atualizado')
            setNome('')
            setFuncao('')
            setRg('')
            setUnidade('')
            setPostgrad('')
            toggle()

            
           
          }
          )
        .catch(()=>{
            console.log('Erro ao atualizar')

        })
        
    }

    // function handleSobreescrever(e){
    //     setListaMilitar({...listaMilitar,[e.target.name] : e.target.value})
    //     setRenderizar(!renderizar)
    //     setFilter([])

    // }
    function handleSobreescrever(e) {
      const { name, value } = e.target;
      // Atualize o estado `listaMilitar` com os novos valores.
      setListaMilitar({ ...listaMilitar, [name]: value });
      // Atualize o estado `props.data` para refletir as edições imediatamente.
      props.data[name] = value;
      // Atualize o estado `renderizar` para forçar a renderização do componente.
      setRenderizar(!renderizar);
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
                  <h6 className="heading-small text-muted mb-4">
                    Informações Pessoais
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Nome"
                            name='nome'
                            type="text"
                            value={listaMilitar.nome}
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
                            RG
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="000000"
                            name='rg'
                            type="text"
                            value={listaMilitar.rg}
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
                            Posto/Grad
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Posto/Grad"
                            name='postgrad'
                            type="text"
                            value={listaMilitar.postgrad}
                            onChange={e =>handleSobreescrever(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Unidade
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Unidade"
                            name="unidade"
                            type="text"
                            value={listaMilitar.unidade}
                            onChange={e =>handleSobreescrever(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Função
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Função"
                            name='funcao'
                            type="text"
                            value={listaMilitar.funcao}
                            onChange={e =>handleSobreescrever(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>
       
        </ModalBody>

     
        <ModalFooter>
          <Button color="success"  onClick={editarPost} func={() => (handleSobreescrever.aparelhos.id)} >
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

export default ModalEditUser;