import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Col, Row, Form } from 'reactstrap';

import {db} from '../../firebase';




function ModalExample(props) {
    const [user,setUser] =useState({})
    const [filter ,setFilter] =useState([])

  useEffect(()=>{
      db.child('Aparelhos').on('value',snapshot =>{
        if(snapshot.val()!=null){
          setUser({
            ...setUser.val()
          })

        }
      })
  },[])
  console.log(user,'OIII')
  



  return (
    <div>
      <Button className='botaoEditar' size='sm' >
        Editar
      </Button>

    
    </div>
  );
}

export default ModalExample;