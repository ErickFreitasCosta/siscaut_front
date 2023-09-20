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
  

    import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore'
    import {db} from '../../firebase'

function ModalAdd(args) {
  const [modal, setModal] = useState(false);

  const [modelo, setModelo] = useState('')
    const [imei1, setImei1] =   useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')

 /////////////////////////// //validação
    const [emptyevalue, setEmptyevalue] = useState(false);
    const [validImei, setValidImei] = useState(false);
//////////////////////////
    

  const toggle = () => {
    setModal(!modal)
    setEmptyevalue(false)
  } 

/*   const Add = () => args.Add()
  
  const acionarConstantes = () => {
    Add()
    toggle()
  }; */


  /////////////////////////////////função handleAdd/////////////////////////////////////

  async function handleAdd(){

    if ( !modelo|| !imei1 ||!imei2  || !marca ){
      setEmptyevalue(true)
    }else{ 
      if(imei1.length<15 ||imei2.length<15){
       
        setValidImei(true)
      }else{  
    

    await addDoc(collection(db,"Aparelhos"),{
      imei1: imei1,
      imei2: imei2,
      marca:marca,
      modelo:modelo,
    })
    .then(()=>{
      toast.success('Aparelho adicionado com sucesso')
      setImei1('')
      setImei2('')
      setModelo('')
      setMarca('')
      toggle()
    })
    .catch((error)=>{
      toast.error('Erro ao adicionar aparelho')
      console.log(error)
  
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
        <ModalHeader toggle={toggle}>Adicionar aparelhos</ModalHeader>
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
                            name = "valueModelo"
                            value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  />

{emptyevalue && modelo==='' ? <Alert color='danger'>Coloque o modelo</Alert> :''}

                        </FormGroup>
                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Marca 
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Marca"
                            type="text"
                            value={marca}
                            onChange={(e)=> setMarca(e.target.value)}
                           
                          />
                          {emptyevalue && marca==='' ? <Alert color='danger'>Coloque a marca</Alert> :''}
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
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei1(e.target.value);
                            }}
                            placeholder="IMEI"
                            type="text"
                            value={imei1}
                            onChange={(e)=> setImei1(e.target.value)}
                          />
                          {emptyevalue && imei1==='' ? <Alert color='danger'>Coloque o primeiro imei</Alert> :''}
                          {validImei && imei1.length<15 &&  imei1.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
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
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
                              setImei2(e.target.value);
                            }}
                            placeholder="IMEI"
                            type="text"
                            value={imei2}
                            onChange={(e)=> setImei2(e.target.value)}

                          />
                          {emptyevalue && imei2==='' ? <Alert color='danger'>Coloque o segundo imei</Alert> :''}
                          {validImei && imei2.length<15 &&  imei2.length>0 ? <Alert color='danger'>Imei inválido, são necessários 15 digitos!</Alert> :''}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    
                      
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>
        </ModalBody>


        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
            Salvar
          </Button>{' '}
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
}

export default ModalAdd;