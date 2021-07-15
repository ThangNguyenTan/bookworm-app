import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

function GridButtonGroup({ viewMode, onChangeViewMode }) {
    return (
        <ButtonGroup>
            <Button
                variant={viewMode === "portrait" ? "dark" : "light"}
                onClick={() => onChangeViewMode("portrait")}
            >
                <i className="fas fa-th-large"></i>
            </Button>
            <Button
                variant={viewMode === "landscape" ? "dark" : "light"}
                onClick={() => onChangeViewMode("landscape")}
            >
                <i className="fas fa-list"></i>
            </Button>
        </ButtonGroup>
    );
}

export default GridButtonGroup;
