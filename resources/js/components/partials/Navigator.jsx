import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import bookwormLogo from "../../../assets/bookworm_icon.svg";
import { Link } from "react-router-dom";

function Navigator() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={bookwormLogo} alt="Logo" className="img-fluid" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/shop" className="nav-link">
                            Shop
                        </Link>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                        <Link to="/" className="nav-link">
                            Cart (0)
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigator;
