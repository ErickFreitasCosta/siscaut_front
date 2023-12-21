import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form, Alert 
} from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ModalEditUser(props,renderizar,setRenderizar,filter,setFilter) {
  const [modal, setModal] = useState(false);
 

  /////////////////////////// //validação
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validRg, setValidRg] = useState(false);
//////////////////////////

  const toggle = () => {
    setEmptyevalue(false);
    setValidRg(false);
    setModal(!modal)};

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
        
      if ( !listaMilitar.nome|| !listaMilitar.funcao ||!listaMilitar.rg  || !listaMilitar.unidade || !listaMilitar.postgrad ){
        setEmptyevalue(true)
       
      }else{
        if(listaMilitar.rg.length< 3){
          setValidRg(true)
          
        }else{
          
        const docRef = doc(db,'Militares',props.data.id)
        await updateDoc(docRef,{
          nome: listaMilitar.nome,
          funcao: listaMilitar.funcao,
          rg:listaMilitar.rg,
          unidade: listaMilitar.unidade,
          postgrad: listaMilitar.postgrad,
         
        })
        .then(()=>{
            toast.success('Os dados do militar foram alterados com sucesso')
            setNome('')
            setFuncao('')
            setRg('')
            setUnidade('')
            setPostgrad('')
            toggle()
            
          }
          )
        .catch((error)=>{
            console.log(error)
            toast.error('Ocorreu algum erro ao alterar os dados, tente novamente em alguns segundos')
            
        })
       }
      }   
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
      /* props.data[name] = value; */
      // Atualize o estado `renderizar` para forçar a renderização do componente.
      /* setRenderizar(!renderizar); */
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
                          {emptyevalue && listaMilitar.nome==='' ? <Alert color='danger'>Coloque a unidade</Alert> :''}
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
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 7);
                              setRg(e.target.value);
                            }}
                            name='rg'
                            type="text"
                            value={listaMilitar.rg}
                            onChange={e =>handleSobreescrever(e)}
                          />
                          {emptyevalue && listaMilitar.rg==='' ? <Alert color='danger'>Coloque a unidade</Alert> :''}
                          {validRg && rg.length<3 &&  rg.length>0 ? <Alert color='danger'>RG inválido, números insuficientes!</Alert> :''}
                          
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
                          <Input type="select" name="postgrad" id="SelectMarca" value={listaMilitar.postgrad} onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value="Volutário Civil">Volutário Civil</option>
                            <option value='Soldado'>Soldado</option>
                            <option value='Cabo'>Cabo</option>
                            <option value='3º Sargento'>3ª Sargento</option>
                            <option value='2º Sargento'>2ª Sargento</option>
                            <option value='1º Sargento'>1ª Sargento</option>
                            <option value='Sub Tenente'>Sub Tenente</option>
                            <option value='2º tenente'>2º tenente</option>
                            <option value='1º tenente'>1º tenente</option>
                            <option value='Capitão'>Capitão</option>
                            <option value='Major'>Major</option>
                            <option value='Tenente Coronel'>Tenente Coronel</option>
                            <option value='Coronel'>Coronel</option>
                          </Input>
                          {emptyevalue && listaMilitar.postgrad==='' ? <Alert color='danger'>Coloque o Posto/Grad</Alert> :''}
                          {/* <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Posto/Grad"
                            name='postgrad'
                            type="text"
                            value={listaMilitar.postgrad}
                            onChange={e =>handleSobreescrever(e)}
                          />
                          {emptyevalue && listaMilitar.postgrad==='' ? <Alert color='danger'>Coloque a unidade</Alert> :''} */}
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
                          {emptyevalue && listaMilitar.unidade==='' ? <Alert color='danger'>Coloque a unidade</Alert> :''}
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
                          {emptyevalue && listaMilitar.funcao === '' ? <Alert color='danger'>Coloque a unidade</Alert> :''}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>
       
        </ModalBody>

     
        <ModalFooter>
          <Button color="success"  onClick={editarPost}  >
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