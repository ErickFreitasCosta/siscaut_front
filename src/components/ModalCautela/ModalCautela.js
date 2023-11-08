import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  Alert,
Spinner } from 'reactstrap';

    import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    import {doc, setDoc, Collection, addDoc, collection, onSnapshot, updateDoc, deleteDoc,query , where, getDoc, getDocs} from 'firebase/firestore'
    import {db} from '../../firebase'
   

function Modall(props) {
  const [modal, setModal] = useState(false);

  

    const [emptyevalue, setEmptyevalue] = useState(false)
    const [loadCautelar, setLoadCautelar]= useState(false)

    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')

   


    
    const [militares, setMilitares] = useState ([]);
    const [fiscais, setFiscais] = useState ([]);
    const [chip, setChip] = useState ([]);


    const [idChip, setIdChip] = useState ('')
    const [idMilitar, setIdMilitar] = useState ('')
    const [nomeFiscal, setNomeFiscal] = useState ('')
    const [nomeMilitar, setNomeMilitar] = useState ('')

    

    const [listaAparelhos, setListaAparelhos] = useState(props.data)
    /* console.log(listaAparelhos) */



  const toggle = () => {setModal(!modal)
    setEmptyevalue(false)
  };


  /////////////////////////////////Militares/////////////////////////////////////
  useEffect(()=>{
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
  
  },[])
  ///////////////////////////////////////////////////////////////



  


  /////////////////////////////////Chips//////////////////////////////////////
  useEffect(()=>{

    function loadChips(snapshot) {
      let listaChips = [];
  
      snapshot.forEach((doc) => {
        listaChips.push({
          id: doc.id,
          numero: doc.data().numero,
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
  },[])
  ////////////////////////////////////////////////////////////////////////////////////



   ///////////////////////////////// -Fiscais- /////////////////////////////////////
   useEffect(()=>{
    async function loadFiscais(){
      try {
        const querySnapshot = await getDocs(collection(db, 'fiscais_contrato'));
  
        let listaFiscais = [];
        querySnapshot.forEach((doc) => {
          listaFiscais.push({
            id: doc.id,
            nome: doc.data().nome,
          });
        });
  
        setFiscais(listaFiscais);
      } catch (error) {
        // Trate erros aqui
        console.error("Ocorreu um erro:", error);
      }
    }
    loadFiscais();
  
  },[])

  
  ///////////////////////////////////////////////////////////////



  /////////////////////////////////FUNÇÃO DE CAUTELA/////////////////////////////////////


  async function HandleCautelar() {
    const dataAtual = new Date();
    setLoadCautelar(true)


    /* const dataFormatada = `${dia}/${mes}/${ano}`; */

    try {
      if(idChip===""||idMilitar===""|| nomeFiscal===""){
        
        setEmptyevalue(true)
        
      }else{
      await addDoc(collection(db, "Cautelas"), {
        aparelho: listaAparelhos.id,
        chip: idChip,
        militar: idMilitar,
        fiscal_caut: nomeFiscal,
        date_caut:  dataAtual.toISOString(),
  
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
    }
    }
     catch (error) {
      // Trate erros aqui
      console.error("Ocorreu um erro:", error);
    }finally{
      setLoadCautelar(false)
    }
  

  }
  
  
////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
        Cautelar
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...props}>
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
                          <Input type="select" id="SelectResponsavel"
                          value={idMilitar} onChange={(e)=>setIdMilitar(e.target.value)} >
                            <option value=''>Escolha</option>
                            {militares.map((militares)=>{
                              
                              return(
                                
                                <option key={militares.id} value={militares.id}>{militares.nome}</option>
                              )
                            })}
                          </Input>
                          {emptyevalue && idMilitar ==='' ? <Alert color='danger'>Coloque o responsável.</Alert> :''}
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
                          value={idChip} onChange={(e)=>setIdChip(e.target.value)}>
                            <option value=''>Escolha</option>
                            {chip.map((chips)=>{
                              return(
                                <option key={chips.id} value={chips.id}>{chips.numero}</option>
                              )
                            })}
                          </Input>
                          {emptyevalue && idChip ==='' ? <Alert color='danger'>Coloque número.</Alert> :''}
                        </FormGroup>
                      </Col>


                      <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Fiscal do contrato
                          </label>
                          <Input type="select" id="SelectResponsavel" 
                          value={nomeFiscal} onChange={(e)=>setNomeFiscal(e.target.value)}>
                            <option value=''>Escolha</option>
                            {fiscais.map((fiscal)=>{
                              return(
                                <option key={fiscal.id} value={fiscal.nome}>{fiscal.nome}</option>
                              )
                            })}
                          </Input>
                          {emptyevalue && nomeFiscal ==='' ? <Alert color='danger'>Coloque o fiscal do contrato.</Alert> :''}
                          
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
          <Button color="success" onClick={HandleCautelar}>
          {loadCautelar ? (<><Spinner size="sm" color="sucess"></Spinner>{" "}<span>Cautelando</span></>) :
            (
              "Cautelar"
            )}
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