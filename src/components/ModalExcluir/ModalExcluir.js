import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example({args, func, title}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button  size='sm' color="danger" onClick={toggle}>
        Excluir
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Excluir {title}</ModalHeader>
        <ModalBody>
         VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR PERMANENTEMENTE ?
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