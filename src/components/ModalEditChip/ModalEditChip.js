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
  const [validChip, setValidChip] = useState(false);
//////////////////////////////////////

  const toggle = () => {setModal(!modal)
    setEmptyevalue(false)};

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

    const [idAparelho, setIdAparelho]= useState('')

    const [listaChip, setListaChip]= useState(props.data)

    //////////////////////HANDLE EDIT /////////////////////////////////////////
    async function editarPost(){
      const docRef = doc(db,'Chip',props.data.id)
      
      if ( !listaChip.nserie|| !listaChip.linha ){
        setEmptyevalue(true)
      }else{
        if(nserie.length<20){
          setValidChip(true)
        }else{
        await updateDoc(docRef,{
            linha: listaChip.linha,
            nserie:listaChip.nserie,
         
        })
        .then(()=>{
          toast.success('Chip alterado com sucesso')
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
        setListaChip({...listaChip,[e.target.name] : e.target.value})

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
          Nº de Série
        </label>
        <Input
          className="form-control-alternative"
          /* defaultValue="lucky.jesse" */
          id="input-ModeloHt"
          placeholder="Nº de série"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
            setNserie(e.target.value);
          }}
          value={listaChip.nserie}
          name='nserie'
          onChange={e =>handleSobreescrever(e)}
          type="text"
          maxLength={20}
          
        />
        {emptyevalue && listaChip.nserie==='' ? <Alert color='danger'>Coloque o número de serie</Alert> :''}

        {validChip && listaChip.nserie.length<20 &&  listaChip.nserie.length>0 ? <Alert color='danger'>número de serie inválido, são necessários 20 digitos!</Alert> :''}
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
          Linha
        </label>
        
        <Input type="select" name="linha" id="SelectMarca" value={listaChip.linha} onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Vivo'>Vivo </option>
                          </Input>
                          {emptyevalue && listaChip.linha ==='' ? <Alert color='danger'>Coloque a linha</Alert> :''}

        
        
        
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