import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar  bg="dark"  variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">TM Building Maintenance</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title="Store Number" id="basic-nav-dropdown" >
              <NavDropdown.Item as={Link}  to={"store/5853"}>5853 - White Rock</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/5838"}>5838 - Surrey 88ave</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/1205"}>1205 - Surrey Central</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/3652"}>3652 - Richmond</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/3098"}>3098 - Guildford</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/1192"}>1192 - New Westminister</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"store/1213"}>1213 - Metrotown</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;