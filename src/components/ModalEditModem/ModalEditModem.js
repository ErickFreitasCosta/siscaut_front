import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form,Alert } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ModalEditCHip(props) {
  const [modal, setModal] = useState(false);

  ////////////////validação////////////
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validImei, setValidImei] = useState(false);
//////////////////////////////////////

  const toggle = () => {setModal(!modal)
    setEmptyevalue(false)
    setValidImei(false)};

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


    const [linha,setLinha] = useState('');
    const [nserie, setNserie] =   useState('')

    const [imei, setImei] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')

    const [listaModem, setListaModem]= useState(props.data)

    //////////////////////HANDLE EDIT /////////////////////////////////////////
    async function editarPost(){
      const docRef = doc(db,'Modem',props.data.id)
      
      if ( !listaModem.imei|| !listaModem.marca || !listaModem.modelo){
        console.log("campos vazios")
        setEmptyevalue(true)
      }else{
        if(listaModem.imei.length<15){
          console.log("imei incompleto")
          setValidImei(true)
        }else{
        await updateDoc(docRef,{
            imei: listaModem.imei,
            modelo:listaModem.modelo,
            marca: listaModem.marca,
         
        })
        .then(()=>{
          toast.success('Modem alterado com sucesso')
            setLinha('')
            setNserie('')
            toggle()

        })
        .catch(()=>{
          toast.error('erro ao alterar')
            

        })
      }
    }
  }
  

  //////////////////////////////////////////////////////////////////////////////////
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
          Imei
        </label>
        <Input
          className="form-control-alternative"
          /* defaultValue="lucky.jesse" */
          id="input-ModeloHt"
          placeholder="Digite o Imei"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
            setNserie(e.target.value);
          }}
          value={listaModem.imei}
          name='imei'
          onChange={e =>handleSobreescrever(e)}
          type="text"
          maxLength={15}
          
        />
        {emptyevalue && listaModem.imei==='' ? <Alert color='danger'>Coloque o número do Imei</Alert> :''}

        {validImei && listaModem.imei.length<15 &&  listaModem.imei.length>0 ? <Alert color='danger'>número de série inválido, são necessários 15 digitos!</Alert> :''}
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
        
        <Input type="select" name="marca" id="SelectMarca" value={listaModem.marca} onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Vivo'>Vivo </option>
                            <option value='Claro'>Claro</option>
                          </Input>
                          {emptyevalue && listaModem.marca ==='' ? <Alert color='danger'>Coloque a marca</Alert> :''}

        
        
        
        {/* <Input
          className="form-control-alternative"
          id="Marca-Ht"
          placeholder="Marca"
          name='linha'
           value={listaChip.linha} 
          onChange={e =>handleSobreescrever(e)}
          type="text"
        /> */}
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
          Modelo
        </label>
        
        <Input type="select" name="modelo" id="SelectMarca" value={listaModem.modelo} onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Modelo 1'>Modelo 1</option>
                            <option value='Modelo 2'>Modelo 2</option>
                          </Input>
                          {emptyevalue && listaModem.modelo ==='' ? <Alert color='danger'>Coloque o modelo</Alert> :''}

        
        
        
        {/* <Input
          className="form-control-alternative"
          id="Marca-Ht"
          placeholder="Marca"
          name='linha'
           value={listaChip.linha} 
          onChange={e =>handleSobreescrever(e)}
          type="text"
        /> */}
      </FormGroup>
    </Col>

    
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

export default ModalEditCHip;