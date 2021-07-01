import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import bookwormLogo from "../../../assets/bookworm_icon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigator() {
    const { cart } = useSelector((state) => state.cartReducer);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">
                    <img src={bookwormLogo} alt="Logo" className="img-fluid" />
                </Link>
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
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                        <Link to="/cart" className="nav-link">
                            Cart ({cart.length})
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigator;
