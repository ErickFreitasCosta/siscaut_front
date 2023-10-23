
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
// } from "reactstrap";
// import {useNavigate} from "react-router-dom";
// import React ,{ useEffect, useState } from "react";
// import { doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

// import { db } from '../../firebase';



// const Login = () => {

//   useEffect(() => {
//     async function loadLogin() {
//       const unsub = onSnapshot(collection(db, 'Login'), (snapshot) => {
//         let listaMilitares = [];

//         snapshot.forEach((doc) => {
//           listaMilitares.push({
//             id: doc.id,
//             emailUser: email,
//             senhaUser: doc.senha
            
         
//           });
//         });

//         setLogin(listaMilitares);
//       });

//       return unsub; // Clean up the snapshot listener
//     }
    
//     loadLogin();
//   }, []);





//   const navigate = useNavigate()

//   const [login, setLogin] = useState('');

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     // Chame a função para verificar no banco de dados aqui
//     checkCredentials(email, password);
//   };

//   const checkCredentials = (email, password) => {
//     const user = login.find(user => user === email && user === password);



//     // Lógica de verificação simulada (substitua isso com uma chamada ao seu backend)
//     // if (email === 'efreitas256@gmail.com' && password === '123456') {
//     //   console.log('Credenciais válidas. Faça o redirecionamento ou a ação desejada.');
//     //   navigate('/index');
//     // } else {
//     //   alert('senha errada')
//     //   console.log('Credenciais inválidas.');
//     // }
//     if (user) {
//       console.log('Credenciais válidas. Faça o redirecionamento ou a ação desejada.');
//       navigate('/index');
//     } else {
//       alert('Senha errada ou usuário não encontrado.');
//       console.log('Credenciais inválidas.');
//     }


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate('/dashboard')

//   }



//   }
//   return (
//     <>
//       <Col lg="5" md="7">
//         <Card className="bg-secondary shadow border-0">
//           <CardHeader className="bg-transparent pb-5">
       
//             <div className="btn-wrapper text-center">
     
//               <Button
//                 className="btn-neutral btn-icon"
//                 color="default"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//                 style={{width: '70%'}}
//               >
//                 <span className="btn-inner--icon">
//                   <img
//                     alt="..."
//                     src={
//                       require("../../assets/img/brand/pm-pa.png")
                        
//                     }
//                     style={{width: '30%'}}
//                   />
//                 </span>
//                 <span style={{fontSize: 20}} className="btn-inner--text">DITEL</span>
//               </Button>
//             </div>
//           </CardHeader>
//           <CardBody className="px-lg-5 py-lg-5">
//             <div className="text-center text-muted mb-4">
//               <small>Entre com suas credenciais</small>
//             </div>
//             <Form role="form">
//               <FormGroup className="mb-3">

//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-email-83" />
//                     </InputGroupText>
//                   </InputGroupAddon>

//                   <Input
//                     placeholder="Email"
//                     type="email"
//                     autoComplete="new-email"
                  
                
//                     value={email}
//                     onChange={handleEmailChange}  
//                   />

//                 </InputGroup>
//               </FormGroup>


//               <FormGroup>
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-lock-circle-open" />
//                     </InputGroupText>
//                   </InputGroupAddon>

//                   <Input
//                     placeholder="Senha"
//                     type="password"
                  
//                     autoComplete="new-password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                   />

//                 </InputGroup>
//               </FormGroup>


//               <div className="custom-control custom-control-alternative custom-checkbox">
//                 <input
//                   className="custom-control-input"
//                   id=" customCheckLogin"
//                   type="checkbox"
//                 />
           

//               </div>
//               <div className="text-center">
//                 <Button className="my-4" color="primary" type="submit" onClick={handleLogin}>
//                  Entrar
//                 </Button>
//               </div>
//             </Form>
//           </CardBody>
//         </Card>
//         <Row className="mt-3">
//           <Col xs="6">
//             <a
//               className="text-light"
//               href="#pablo"
//               onClick={(e) => e.preventDefault()}
//             >
//               {/* <small>Forgot password?</small> */}
//             </a>
//           </Col>
//           <Col className="text-right" xs="6">
//             <a
//               className="text-light"
//               href="#pablo"
//               onClick={(e) => e.preventDefault()}
//             >
//               <small>Esqueceu a senha?</small>
//             </a>
//           </Col>
//         </Row>
//       </Col>
//     </>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'Login'), (snapshot) => {
      let listaMilitares = [];

      snapshot.forEach((doc) => {
        listaMilitares.push({
          id: doc.id,
          emailUser: doc.data().email, // Assumindo que o campo é chamado 'email'
          senhaUser: doc.data().senha,
        });
      });

      setLogin(listaMilitares);
    });

    return unsub; // Limpe o ouvinte do snapshot
  }, []);

  const checkCredentials = (email, password) => {
    const user = login.find(user => user.emailUser === email && user.senhaUser === password);

    if (user) {
      console.log('Credenciais válidas. Faça o redirecionamento ou a ação desejada.');
      navigate('/admin/index');
    } else {
      alert('Senha errada ou usuário não encontrado.');
      console.log('Credenciais inválidas.');
      navigate('/auth/login');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkCredentials(email, password);
    console.log(handleSubmit,'AQUIIIII')
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                style={{ width: '70%' }}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/pm-pa.png")}
                    style={{ width: '30%' }}
                  />
                </span>
                <span style={{ fontSize: 20 }} className="btn-inner--text">DITEL</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Entre com suas credenciais</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">

                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                  Entrar
                </Button>

              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Forgot password?</small> */}
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Esqueceu a senha?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;

