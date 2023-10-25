import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  Label, 
  CustomInput,
  Alert} from 'reactstrap';

  import {db} from '../../firebase'
  import { addDoc, collection } from 'firebase/firestore'

  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
   

function Modall(args) {
  const [modal, setModal] = useState(false);

    //////////////validação/////////////
    const [emptyevalue, setEmptyevalue] = useState(false);
    const [validHt, setValidHt] = useState(false);
   //////////////////////////////////////////////// 

    const [nserie, setNserie] = useState('')
    const [base, setBase] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')  

  
  const toggle = (props) => {
    setMarca('')
    setModelo('')
    setValidHt(false)
    setEmptyevalue(false)
    setNserie('') 
    setBase('')
    setModal(!modal)
  };

  /////////////////////////////////Função HandleAdd////////////////////////////

  async function handleAdd(){
    

    if ( !nserie|| !base || !marca|| !modelo ){
      setEmptyevalue(true)
    }
    else{
     if(nserie.length<20){
      setValidHt(true)
    }else{


    await addDoc(collection(db,"Ht"),{
      nserie: nserie,
      base: base,
      marca: marca,
      modelo: modelo,
    })
    .then(()=>{
      toast.success('O ht foi adicionado com sucesso')
      setMarca('')
      setModelo('')
      setNserie('')
      setBase('')
      /* setEmptyevalue(false)
      setValidChip(false) */
      toggle()
    })
    .catch((error)=>{
      toast.error('Algo deu errado, tente novamente mais tarde')
  
    });
      }
    }
  }

  

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
        Adicionar
      </Button> 

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar</ModalHeader>
        <ModalBody>
          
          
        <CardBody>
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
                            value={nserie}
                            onChange={(e)=> setNserie (e.target.value)}
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
                          <Input type="select" name="select" id="SelectMarca" value={marca} onChange={(e)=>setMarca(e.target.value)}>
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
                            value={modelo}
                            onChange={(e)=> setModelo (e.target.value)}
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

                            <CustomInput type="radio" id="exampleCustomRadio" onChange={(e)=> setBase (e.target.value)} name="customRadio" label="SIM" value="Sim" />
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
              </CardBody>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
            Adicionar
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