import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col } from 'reactstrap';

   

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [imei1, setImei1] = useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')


  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
        Cautelar
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Cautela</ModalHeader>
        <ModalBody>
          
          
        <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Cautela de Aparelho
                  </h6>
                  <div className="pl-lg-1">
                    <Row>

                    <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Responsável
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Modelo"
                            type="text"
                          
                          />
                        </FormGroup>
                      </Col>


        

                    <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Chip
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Modelo"
                            type="text"
                          
                          />
                        </FormGroup>
                      </Col>

                    <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Modelo
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            disabled
                            placeholder="Modelo"
                            type="text"
                          
                          />
                        </FormGroup>
                      </Col>
                        


                      <Col lg="6">
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
                            disabled
                            placeholder="Marca"
                            type="text"
                            
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
                            disabled
                            type="text"
                            
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
                            disabled
                            placeholder="IMEI"
                            type="text"
                            

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Cautelar
          </Button>{/* {' '} */}
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modall;