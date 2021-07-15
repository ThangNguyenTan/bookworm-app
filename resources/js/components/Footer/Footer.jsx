import React from 'react';
import { Container } from 'react-bootstrap';
import bookwormLogo from "../../../assets/bookworm_icon.svg";

function Footer() {
    return (
        <footer>
            <Container>
                <img src={bookwormLogo} alt="Logo" className="img-fluid" />
                <ul>
                    <li>
                        <p>Address: 2414 Midway Road</p>
                    </li>
                    <li>
                        <p>Phone: 479-649-8255</p>
                    </li>
                </ul>
            </Container>
        </footer>
    )
}

export default Footer
