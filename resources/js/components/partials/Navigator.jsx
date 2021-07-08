import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import bookwormLogo from "../../../assets/bookworm_icon.svg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navigator() {
    const { cart } = useSelector((state) => state.cartReducer);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    <img src={bookwormLogo} alt="Logo" className="img-fluid" />
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            exact
                            activeClassName="active"
                            to="/"
                            className="nav-link"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            to="/shop-client"
                            className="nav-link"
                        >
                            Shop
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            to="/about"
                            className="nav-link"
                        >
                            About
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            to="/profile"
                            className="nav-link"
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            to="/cart"
                            className="nav-link"
                        >
                            Cart ({cart.length})
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigator;
