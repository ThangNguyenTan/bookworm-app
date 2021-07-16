import React from "react";
import { Col } from "react-bootstrap";
import { CardItem, CardItemLandscape } from "../Card";
import { ErrorBox } from "../Partials";

function BookList(props) {
    const renderBookItems = () => {
        if (props.books && props.books.length > 0) {
            return props.books.map((bookItem) => {
                const item = {
                    discount_price: bookItem.discount_price,
                    original_price: bookItem.book_price,
                    title: bookItem.book_title,
                    author_name: bookItem.author_name,
                    author_id: bookItem.author_id,
                    cover_photo: bookItem.book_cover_photo,
                    id: bookItem.id
                };

                return (
                    <Col lg={3} md={6} sm={12} key={bookItem.id}>
                        <CardItem item={item} />
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
                const item = {
                    discount_price: bookItem.discount_price,
                    original_price: bookItem.book_price,
                    title: bookItem.book_title,
                    author_name: bookItem.author_name,
                    author_id: bookItem.author_id,
                    cover_photo: bookItem.book_cover_photo,
                    id: bookItem.id,
                    summary: bookItem.book_summary,
                };

                return (
                    <Col lg={6} md={12} sm={12} key={bookItem.id} className="mb-4">
                        <CardItemLandscape item={item} />
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
