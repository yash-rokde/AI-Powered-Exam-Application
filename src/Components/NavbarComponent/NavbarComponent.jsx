import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../../assets/Logo-removebg-preview.png";
import "./NavbarComponent.css";

const NavbarComponent = () => {
  return (
    <>
      <Navbar expand="lg" className="notifi-bar">
        <Container className="justify-content-center">
          <h5 style={{ textAlign: "center", fontSize: 17 }} className="py-1">
            Login functionality currently not supported!!!
          </h5>
        </Container>
      </Navbar>
      <Navbar expand="lg" className="customnavbarbg" sticky="top">
        <Container>
          <Form className="d-flex align-items-center">
            <img src={logo} id="logo-img"></img>
            <Navbar.Brand href="#home" id="logo-heading">
              PrepEX
            </Navbar.Brand>
          </Form>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                href="#home"
                className="nav-links"
                style={{ fontWeight: "bold" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#link"
                className="nav-links"
                style={{ fontWeight: "bold" }}
              >
                Quick Guide
              </Nav.Link>
              <Nav.Link
                href="#link"
                className="nav-links"
                style={{ fontWeight: "bold" }}
              >
                How it Works?
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <Button variant="outline-secondary" className="mx-2 navbtn">
                Register
              </Button>
              <Button variant="primary" className="navbtn">
                Log In
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
