import "./HomeComponent.css";
import Button from "react-bootstrap/Button";
import homeimage from "../../assets/wmremove-transformed.png";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const HomeComponent = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [testStatus, setTestStatus] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const HandlingTestStatus = () => {
    if (text.length > 0) {
      setTestStatus(true);
    } else {
      alert("Please enter some text to proceed");
    }
  };

  return (
    <>
      <div className="parentHome">
        <div className="homesection">
          <div className="left-container">
            <div className="header-content">
              <li className="HomeHeading">Conquer</li>
              <li className="HomeHeading" style={{ color: "blue" }}>
                Your Exam
              </li>
              <li className="HomeHeading">With The Power of AI</li>
            </div>

            <div className="home-button py-3">
              <Button
                variant="outline-secondary"
                className="mx-4"
                onClick={handleShow}
              >
                TAKE EXAM
              </Button>
              <Button variant="primary" className="homeBtn">
                QUICK GUIDE
              </Button>
            </div>
          </div>

          <div className="right-container">
            <img src={homeimage} alt="" id="homeimg" />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Input to AI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-5"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter your content here..</Form.Label>
              <Form.Control as="textarea" rows={15} onChange={handleText} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={HandlingTestStatus}>
            Submit Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {testStatus && navigate("/exam", { state: { text }, replace: true })}
    </>
  );
};
export default HomeComponent;
