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
  Label,
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

const CreateHt = () => {
  const navigation = useNavigate()
  const back = (event) => {
    event.preventDefault()
    navigation('/admin/dashboard')
  }

  // AQUI SERÃO AS FUNÇÕES QUE IREI CRIAR  
  // CADASTRAR HT

  function Alarme(){
    alert('oi')
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
                    <h3 className="mb-0 align-items-center">Cadastrar HT</h3>
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
                    Informações HT
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nº de Série
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
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
                            marca
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
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
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup check inline>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Possui Base ?
                          </label>
                          {/* <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Base de Carga
                          </label> */}
                        </FormGroup>
                        <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                          <Input style={{marginLeft: 8}} type="checkbox" />
                            <Label style={{marginLeft: 30}} check>
                              SIM
                            </Label>
                            </Col>
                            <Col lg="3">
                            <Input style={{marginLeft: 5}} type="checkbox" />
                            <Label style={{marginLeft: 25}} check>
                            NÃO
                            </Label>
                            </Col>
                            </Row>
                            </div>
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                  </div>

                  


                      {/* Linha */}
                  <hr className="my-4" />

                  <div className="text-center">
                <Button className="col-8" color="primary" type="button" onClick={Alarme}>
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

export default CreateHt;
