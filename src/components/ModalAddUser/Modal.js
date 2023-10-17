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
    Alert } from 'reactstrap';

    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';


    import {query, where, doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc, getDocs} from 'firebase/firestore'
    import {db} from '../../firebase'

   

function Modall(args) {
  const [modal, setModal] = useState(false);

  /////////////////////////// //validação
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validRg, setValidRg] = useState(false);
//////////////////////////

    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState('')
    const [rg, setRg] = useState('')
    const [unidade, setUnidade] = useState('')
    const [postgrad, setPostgrad] = useState('')


////////////////////////////////////////////////função handleAdd/////////////////////////////////////

  async function handleAdd(){

    try{
    const q = query(
      collection(db, 'Militares'),
      where('rg', '==', rg)
    );
    const querySnapshot = await getDocs(q);
    const resultado = querySnapshot.docs;

    if ( !nome|| !funcao ||!rg  || !unidade || !postgrad ){
      setEmptyevalue(true)
    }else{ if(rg.length<7  ){
      setValidRg(true)
    }else{ if(resultado.length > 0){
      toast.error("Este militar com este Rg já foi adicionado",{
        position: "bottom-center"
      })
      console.log("aqui")
    }else{

    await addDoc(collection(db,"Militares"),{
      nome: nome,
      funcao: funcao,
      rg:rg,
      unidade: unidade,
      postgrad: postgrad,
    })
    .then(()=>{
      toast.success("Militar adicionado com sucesso")
      setNome('')
      setFuncao('')
      setUnidade('')
      setPostgrad('')
      setRg('')
      toggle()
    })
    .catch((error)=>{
      console.log(error)
      toast.error("Ocorreu algum erro, tente novamente mais tarde")
  
    });
  }
       }
    }
  }catch{

  }
  } 
/////////////////////////////////////////////////////////////////////////////////////////////////





  const toggle = () => {

    setModal(!modal)
    setEmptyevalue(false)
    setValidRg(false)
    setNome('')
      setFuncao('')
      setUnidade('')
      setPostgrad('')
      setRg('')
  };

  return (
    <div>
     
      <Button size="sm"color="success" onClick={toggle}>
        Adicionar
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar Usuário</ModalHeader>
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
                            type="text"
                            value={nome}
                            onChange={(e)=> setNome (e.target.value)}
                          />

{emptyevalue && nome==='' ? <Alert color='danger'>Coloque o nome</Alert> :''}
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
                            placeholder="00000"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 7);
                              setRg(e.target.value);
                            }}
                            type="text"
                            value={rg}
                            onChange={(e)=> setRg (e.target.value)}
                          />
                          {emptyevalue && rg==='' ? <Alert color='danger'>Coloque o rg</Alert> :''}
                          {validRg && rg.length<7 &&  rg.length>0 ? <Alert color='danger'>RG inválido, são necessários 7 digitos!</Alert> :''}
                          
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
                          {/* <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Posto/Grad"
                            type="text"
                            value={postgrad}
                            onChange={(e)=> setPostgrad (e.target.value)}

                          /> */}
                          <Input type="select" name="select" id="SelectMarca" value={postgrad} onChange={(e)=>setPostgrad(e.target.value)}>
                            <option value=''>Escolha</option>
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
                          {emptyevalue && postgrad==='' ? <Alert color='danger'>Coloque o Posto/Grad</Alert> :''}
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
                            type="text"
                            value={unidade}
                            onChange={(e)=> setUnidade (e.target.value)}
                          />
                          {emptyevalue && unidade==='' ? <Alert color='danger'>Coloque a unidade</Alert> :''}
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
                            type="text"
                            value={funcao}
                            onChange={(e)=> setFuncao (e.target.value)}
                          />
                          {emptyevalue && funcao==='' ? <Alert color='danger'>Coloque a função</Alert> :''}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>



        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
            salvar
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