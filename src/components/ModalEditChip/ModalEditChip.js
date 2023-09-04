import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'



function ModalEditCHip(props) {
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


    const [linha,setLinha] = useState('');
    const [nserie, setNserie] =   useState('')


    const [idAparelho, setIdAparelho]= useState('')

    const [listaChip, setListaChip]= useState(props.data)
    
    async function editarPost(){

        const docRef = doc(db,'Chip',props.data.id)
        await updateDoc(docRef,{
            linha: listaChip.linha,
            nserie:listaChip.nserie,
         
        })
        .then(()=>{
            console.log('Atualizado')
            setLinha('')
            setNserie('')
            toggle()

        })
        .catch(()=>{
            console.log('Erro ao atualizar')

        })
    }

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
          value={listaChip.nserie}
          name='nserie'
          onChange={e =>handleSobreescrever(e)}
          type="text"
        />
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
        <Input
          className="form-control-alternative"
          id="Marca-Ht"
          placeholder="Marca"
          name='linha'
           value={listaChip.linha} 
          onChange={e =>handleSobreescrever(e)}
          type="text"
        />
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