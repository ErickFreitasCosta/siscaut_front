/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
// import UserHeader from "components/Headers/UserHeader.js";
import {useNavigate} from 'react-router-dom'

import { useState } from "react";

const CreateUser = () => {

  const [nome, setNome] = useState('')
  const [funcao, setFuncao] = useState('')
  const [rg, setRg] = useState('')
  const [unidade, setUnidade] = useState('')
  const [postgrad, setPostgrad] = useState('')

  function HandleCreateUser() {
    
  }


  const navigation = useNavigate()
  const back = (event) => {
    event.preventDefault()
    navigation('/admin/dashboard')
  }
  return (
    <>
      {/* <UserHeader /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row style={{marginTop: 50}}>
          {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
           
          </Col> */}
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0 align-items-center">Criar Usuário</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      // href="/admin/dashboard"
                      onClick={back}
                      size="sm"
                    >
                      Voltar
                    </Button>
                  </Col>
                </Row>
              </CardHeader>


              <CardBody>
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
                  <hr className="my-4" />
                  <div className="text-center">

                <Button onClick={HandleCreateUser} className="col-" color="primary" type="button">
                  Cadastrar
                </Button>

              </div>
                  {/* Address */}
                  
                </Form>
              </CardBody>


            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
