import React, { useState } from "react";
import { Alert } from "react-bootstrap";

function AlertBox({ message, variant, isShowed }) {
    const [show, setShow] = useState(isShowed || false);

    if (show && message) {
        return (
            <Alert
                variant={variant ? variant : "success"}
                onClose={() => setShow(false)}
                dismissible
            >
                {message}
            </Alert>
        );
    }
    return <></>;
}

export default AlertBox;
