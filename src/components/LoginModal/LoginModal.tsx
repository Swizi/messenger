import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";

type LoginModalProps = {
  setChat: Function;
};

const LoginModal: React.FC<LoginModalProps> = ({ setChat }) => {
  const [show, setShow] = useState<Boolean>(true);
  const [login, setLogin] = useState<string>("Noname");

  const handleClose = () => {
    setShow(false);
    setChat(true);
  };
  
  const handleShow = () => setShow(true);

  const receiveLogin = () => {
    localStorage.setItem("login", login);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Your login"
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            receiveLogin();
          }}
        >
          Come in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
