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
  Col,
} from "reactstrap";
// core components
// import UserHeader from "components/Headers/UserHeader.js";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";



const CreateChip = () => {

  const [ndeserie, setNdeserie] = useState('')
  const [linha, setLinha] = useState('')

  function HandleChip() {
    
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
                    <h3 className="mb-0 align-items-center">Cadastrar Chip</h3>
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
                    Informações do Chip
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nª de serie
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="00000000"
                            type="text"
                            value={ndeserie}
                            onChange={(e)=> setNdeserie (e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Linha
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Oi"
                            type="text"
                            value={linha}
                            onChange={(e)=> setLinha (e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      



                      {/* <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Posto/Grad
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}

                    </Row>


                    {/* <Row>
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
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
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
                            Função
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}


                  </div>
                  <hr className="my-4" />
                  <div className="text-center">
                <Button className="col-8" color="primary" type="button">
                  Salvar
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

export default CreateChip;
