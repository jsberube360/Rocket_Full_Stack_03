//imports

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//custom modal

const CustomModal = ({ message, title, action, showModal, handleClose, handleAction}) => {

  return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAction}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CustomModal;