import React from "react";
import BookItem from "./BookItem";
import BookItemLandScape from "./BookItemLandScape";
import ErrorBox from "../Partials/ErrorBox";
import { Col } from "react-bootstrap";

function BookList(props) {
    const renderBookItems = () => {
        if (props.books && props.books.length > 0) {
            return props.books.map((bookItem) => {
                return (
                    <Col lg={3} md={6} sm={12} key={bookItem.id}>
                        <BookItem bookItem={bookItem} />
                    </Col>
                );
            });
        } else {
            return (
                <div className="error-container">
                    <ErrorBox message={`Currently, there is no book`} />
                </div>
            );
        }
    };

    const renderLandScapeBookItems = () => {
        if (props.books && props.books.length > 0) {
            return props.books.map((bookItem) => {
                return (
                    <Col lg={6} md={12} sm={12} key={bookItem.id}>
                        <BookItemLandScape bookItem={bookItem} />
                    </Col>
                );
            });
        } else {
            return (
                <div className="error-container">
                    <ErrorBox message={`Currently, there is no book`} />
                </div>
            );
        }
    };

    return (
        <div className="row book-list">
            {!props.viewMode || props.viewMode === "portrait"
                ? renderBookItems()
                : renderLandScapeBookItems()}
        </div>
    );
}

export default BookList;
