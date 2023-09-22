import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form,Alert,
CustomInput,
Label,
 } from 'reactstrap';

import {db} from '../../firebase';
import {doc, updateDoc,addDoc,getDocs} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ModalEditHt(props) {
  const [modal, setModal] = useState(false);

  ////////////////validação////////////
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validChip, setValidChip] = useState(false);
//////////////////////////////////////


const [nserie, setNserie] = useState('')
const [base, setBase] = useState('')
const [marca, setMarca] = useState('')
const [modelo, setModelo] = useState('')  


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
    const [validHt, setValidHt] =   useState('')

    const [idAparelho, setIdAparelho]= useState('')

    const [listaHt, setListaHt]= useState(props.data)

    //////////////////////HANDLE EDIT /////////////////////////////////////////
    async function editarPost(){
      const docRef = doc(db,'Ht',props.data.id)
      
     /*  if ( !listaChip.nserie|| !listaChip.linha ){
        setEmptyevalue(true)
      }else{
        if(nserie.length<20){
          setValidChip(true)
        }else{ */

        await updateDoc(docRef,{
            base: listaHt.base,
            marca:listaHt.marca,
            modelo:listaHt.modelo,
            nserie:listaHt.nserie,
            
         
        })
        .then(()=>{
          toast.success('Ht alterado com sucesso')
            setLinha('')
            setNserie('')
            toggle()

        })
        .catch(()=>{
          toast.error('erro ao alterar')
            

        })
      }
    
  

  //////////////////////////////////////////////////////////////////////////////////
    function handleSobreescrever(e){
        setListaHt({...listaHt,[e.target.name] : e.target.value})

    }
  


  return (
    <div>
   
      <Button className='botaoEditar' size='sm' onClick={toggle}>
        Editar
      </Button>

      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Editar Ht</ModalHeader>
        <ModalBody>
        <Form>

                  <h6 className="heading-small text-muted mb-4">
                    Informações HT
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">

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
                            placeholder="Nº de serie"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
                              setNserie(e.target.value);
                            }}
                            type="text"
                            name="nserie"
                            value={listaHt.nserie}
                            onChange={e =>handleSobreescrever(e)}
                          />
                          {emptyevalue && nserie ==='' ? <Alert color='danger'>Coloque o número de série.</Alert> :''}
                          {validHt && nserie.length<20 &&  nserie.length>0 ? <Alert color='danger'>número de serie inválido, são necessários 20 digitos!</Alert> :''}
                        </FormGroup>
                      </Col>

                      <Col lg="6">
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
                            placehconst [modelo, setModelo] = useState('')older="Marca"
                            type="text"
                            value={marca}
                            onChange={(e)=> setMarca (e.target.value)}
                          />


                        </FormGroup> */}
                        <FormGroup>
                          <Label for="exampleSelect">Marca</Label>
                          <Input type="select"  id="SelectMarca" name="marca"
                            value={listaHt.marca} onChange={e =>handleSobreescrever(e)}>
                            <option value=''>Escolha</option>
                            <option value='Marca 1'>Marca 1</option>
                            <option value='Marca 2'>Marca 2</option>
                            <option value='Marca 3'>Marca 3</option>
                          </Input>
                          {emptyevalue && marca ==='' ? <Alert color='danger'>Coloque a marca.</Alert> :''}
                      </FormGroup>




                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Modelo
                          </label>
                          <Input
                            className="form-control-alternative"
                            /* defaultValue="Lucky" */
                            id="input-first-name"
                            placeholder="Modelo"
                            type="text"
                            name="modelo"
                            value={listaHt.modelo}
                            onChange={e =>handleSobreescrever(e)}
                          />
                        {emptyevalue && modelo ==='' ? <Alert color='danger'>Coloque o modelo.</Alert> :''}
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        
                        {/* <FormGroup check inline>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Possui Base ?
                          </label>
                      
                        </FormGroup> */}
                        {/* CheckBox selecionando apenas um */}
                         <FormGroup>
                            <Label for="exampleCheckbox">Possuí base ?</Label>
                          </FormGroup>
                          <FormGroup></FormGroup>




                        <div className="pl-lg-4">
                        {/* <Row>
                          <Col lg="6">
                          <Input style={{marginLeft: 8}} type="checkbox" />
                              <Label style={{marginLeft: 30}} check> SIM</Label>
                            </Col>
                            <Col lg="3">
                            <Input style={{marginLeft: 5}} type="checkbox" />
                              <Label style={{marginLeft: 25}} check>
                              NÃO
                              </Label>
                            </Col>
                            </Row> */}
                            <Row>

                            <Col lg="6">

                            <CustomInput type="radio" id="exampleCustomRadio" onChange={(e)=> setBase (e.target.value)} name="customRadio" label="SIM"  />
                            </Col>
                            <Col lg="3">

                            <CustomInput type="radio" id="exampleCustomRadio2" onChange={(e)=> setBase (e.target.value)} name="customRadio" label="NÃO" value="Não" />
                            </Col>
                            {emptyevalue && base ==='' ? <Alert color='danger'>Coloque se ele possuí ou não base.</Alert> :''}
                            </Row>
                            


                            </div>
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

export default ModalEditHt;