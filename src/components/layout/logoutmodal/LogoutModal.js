import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
const LogoutModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Want To Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={logoutHandler}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;
