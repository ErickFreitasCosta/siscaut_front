import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example({args, func,renderizar,setRenderizar}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button  size='sm' color="danger" onClick={toggle}>
        Excluir
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
         VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={func}>
            Sim
          </Button>{' '}
          <Button color="primary" onClick={toggle}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Example;