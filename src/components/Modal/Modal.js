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

  

    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState('')
    const [rg, setRg] = useState('')
    const [unidade, setUnidade] = useState('')
    const [postgrad, setPostgrad] = useState('')


  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size="sm"color="danger" onClick={toggle}>
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
                            type="email"
                            value={rg}
                            onChange={(e)=> setRg (e.target.value)}
                          />
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
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Posto/Grad"
                            type="text"
                            value={postgrad}
                            onChange={(e)=> setPostgrad (e.target.value)}

                          />
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
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>



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