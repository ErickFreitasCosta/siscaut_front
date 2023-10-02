import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col } from 'reactstrap';

    import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc,query , where, getDoc, getDocs} from 'firebase/firestore'
    import {db} from '../../firebase'
   

function Modall(props) {
  const [modal, setModal] = useState(false);

  

    const [imei1, setImei1] = useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')

   


    
    const [militares, setMilitares] = useState ([]);
    const [chip, setChip] = useState ('');


    const [idChip, setIdChip] = useState ("")
    const [nunChip, setNunChip] = useState ('')

    const [idMilitar, setIdMilitar] = useState ('')
    const [nomeMilitar, setNomeMilitar] = useState ('')

    
    const [dadosComValores, setDadosComValores] = useState([]);

    

    const [listaAparelhos, setListaAparelhos] = useState(props.data)
    /* console.log(listaAparelhos) */



  const toggle = () => {
    setModal(!modal)
    
  };

  
  
    /* async function chipCautelado(){
      try{
    const q = query(
      collection(db, 'Cautelas'),
      where('aparelho', '==', props.data.id)
    );
  
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // Para cada documento retornado pela consulta
      const data = doc.data();
      const valorDoCampo = doc.data().chip; // 'chip' é o nome do campo que você deseja recuperar
      setIdChip(valorDoCampo);
    });

    if (idChip) {
      getNumero();
    }

  } catch (error) {
    console.error('Erro ao consultar documento:', error);
  }
  
  } */

  useEffect(()=>{    
  async function chipCautelado() {
    try {
      const q = query(
        collection(db, 'Cautelas'),
        where('aparelho', '==', props.data.id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Para cada documento retornado pela consulta
        const data = doc.data();
        const valorDoCampo = doc.data().chip; // 'chip' é o nome do campo que você deseja recuperar
        setIdChip(valorDoCampo);
      });

      // Após definir idChip, você pode chamar getNumero() aqui
      
     
    } catch (error) {
      console.error('Erro ao consultar documento:', error);
    }
  }
  chipCautelado();
},[])
  
console.log(idChip)
  async function getNumero() {
    try {
      const docRef = doc(db, 'Chip', idChip);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // O documento existe
        const numero = docSnap.data().numero;
        setNunChip(numero);
      } else {
        // O documento não existe
        console.log('O documento não foi encontrado.');
      }
    } catch (error) {
      // Trate erros aqui
      console.error('Erro ao obter o número:', error);
    }
  }

  



  

  /////////////////////////////////Militares/////////////////////////////////////
  /* useEffect(()=>{
    async function loadMilitares(){
      try {
        const querySnapshot = await getDocs(collection(db, 'Militares'));
  
        let listaMilitares = [];
        querySnapshot.forEach((doc) => {
          listaMilitares.push({
            id: doc.id,
            nome: doc.data().nome,
          });
        });
  
        setMilitares(listaMilitares);
      } catch (error) {
        // Trate erros aqui
        console.error("Ocorreu um erro:", error);
      }
    }
      loadMilitares();
  
  },[]) */
  ///////////////////////////////////////////////////////////////


  /////////////////////////////////Chips/////////////////////////////////////
  /* useEffect(()=>{

    function loadChips(snapshot) {
      let listaChips = [];
  
      snapshot.forEach((doc) => {
        listaChips.push({
          id: doc.id,
          aparelho: doc.data().numero,
        });
      });
  
      setChip(listaChips);
    }
      
    // Cria a consulta inicial
    const q = query(
      collection(db, 'Chip'),
      where('cautelado', '==', false)
    );

      // Executa a consulta inicial e ouve as atualizações em tempo real
    const unsub = onSnapshot(q, (snapshot) => {
      loadChips(snapshot);
    });

    return () => unsub();
  },[]) */
  ///////////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////FUNÇÃO DE CAUTELA/////////////////////////////////////


  /* async function HandleCautelar() {
    const dataAtual = new Date();
    try {
      await addDoc(collection(db, "Cautelas"), {
        aparelho: listaAparelhos.id,
        chip: idChip,
        militar: idMilitar,
        data: {
          dia: dataAtual.getDate(),
          mes: dataAtual.getMonth() + 1,  
          ano: dataAtual.getFullYear(),
        },
      });
  
      const docAparelho = doc(db, 'Aparelhos', props.data.id);
      const docChip = doc(db, 'Chip', idChip);
  
      await updateDoc(docAparelho, {
        cautelado: true,
      });
  
      await updateDoc(docChip, {
        cautelado: true,
      });
  
      toast.success("Aparelho cautelado");
      toggle();
    } catch (error) {
      // Trate erros aqui
      console.error("Ocorreu um erro:", error);
    }
  } */
  
  
////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
        Informações
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Informações</ModalHeader>
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
                          <Input type="select" id="SelectResponsavel"
                          value={idMilitar} onChange={(e)=>setIdMilitar(e.target.value)} >
                            <option value=''>Escolha</option>
                            
                          
                          </Input>
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
                          <Input type="select" id="SelectResponsavel" 
                          /* value='{idChip}'  *//* onChange='{(e)=>setIdChip(e.target.value)}' */>
                            <option value=''>{nunChip}</option>
                            
                          </Input>
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
                            value={listaAparelhos.modelo} 
                          
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
                            value={listaAparelhos.marca} 
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
                            value={listaAparelhos.imei1} 
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
                            value={listaAparelhos.imei2} 
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