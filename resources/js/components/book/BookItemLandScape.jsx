import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Card, Col, Row } from "react-bootstrap";

function BookItem(props) {
    const dispatch = useDispatch();
    const bookItem = props.bookItem;

    const { cart } = useSelector((state) => state.cartReducer);

    const handleAddToCart = () => {
        dispatch(addToCart(bookItem, 1));
    };

    const renderAddToCartButton = () => {
        if (cart) {
            const existed = cart.find((cartItem) => {
                return cartItem.bookID === bookItem._id;
            });
            if (existed) {
                return (
                    <Link
                        to="/cart"
                        type="button"
                        style={{ textAlign: "center" }}
                        className="button primary block"
                    >
                        Go to cart
                    </Link>
                );
            }
        }

        return (
            <button
                type="button"
                className="button dark block"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        );
    };

    return (
        <Col lg={6} md={12} sm={12}>
            <Card className="book-item landscape">
                <Row className="no-gutters">
                    <Col md={4}>
                        <Card.Img
                            width="100%"
                            variant="top"
                            src={
                                bookItem.book_cover_photo
                                    ? `./images/bookcover/${bookItem.book_cover_photo}.jpg`
                                    : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                            }
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/books/${bookItem.id}`}>
                                    {bookItem.book_title}
                                </Link>
                            </Card.Title>
                            <Card.Text>
                                <p>{bookItem.book_summary}</p>
                                <h6>{bookItem.author.author_name}</h6>
                                <h4>${bookItem.book_price}</h4>
                            </Card.Text>
                            {renderAddToCartButton()}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}

export default BookItem;
