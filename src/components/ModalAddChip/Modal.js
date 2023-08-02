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
  Label } from 'reactstrap';

   

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [nserie, setNserie] = useState('')
    const [base, setbase] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')


  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size="xm"color="success" onClick={toggle}>
        Adicionar
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar</ModalHeader>
        <ModalBody>
          
          
        <CardBody>
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
                            Marca
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="Marca-Ht"
                            placeholder="Marca"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      
                    </Row>
                    
                  </div>
                  
                </Form>
              </CardBody>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={toggle}>
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