import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import { addToCart } from "../../actions";

function CardItemLandscape(props) {
    const dispatch = useDispatch();
    const item = props.item;
    const {
        discount_price,
        original_price,
        title,
        author_name,
        author_id,
        cover_photo,
        id,
        summary,
    } = item;

    const { cart } = useSelector((state) => state.cartReducer);

    const renderPriceTag = () => {
        if (discount_price == original_price) {
            return <h4 className="price">${original_price}</h4>;
        }

        return (
            <h4 className="price">
                ${discount_price}
                <span>${original_price}</span>
            </h4>
        );
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart(
                {
                    book_title: title,
                    book_og_price: discount_price,
                    book_price: original_price,
                    book_cover_photo: cover_photo,
                    author: {
                        author_name: author_name,
                        id: author_id,
                    },
                    id: id,
                },
                1
            )
        );
    };

    const renderAddToCartButton = () => {
        if (cart) {
            const existed = cart.find((cartItem) => {
                return cartItem.bookID === id;
            });
            if (existed) {
                return (
                    <Link
                        to="/cart"
                        type="button"
                        style={{ textAlign: "center" }}
                        className="btn btn-primary btn-block"
                    >
                        Go to cart
                    </Link>
                );
            }
        }

        return (
            <button
                type="button"
                className="btn btn-dark btn-block"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        );
    };

    return (
        <Card className="card-item landscape">
            <Row className="no-gutters">
                <Col md={4}>
                    <LazyLoad height={200}>
                        <Card.Img
                            width="100%"
                            variant="top"
                            src={
                                cover_photo
                                    ? `./images/bookcover/${cover_photo}.jpg`
                                    : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                            }
                        />
                    </LazyLoad>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>
                            <Link to={`/books/${id}`}>{title}</Link>
                        </Card.Title>
                        <div>
                            <p>{summary}</p>
                            <h6>{author_name}</h6>
                            {renderPriceTag()}
                        </div>
                        {renderAddToCartButton()}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default CardItemLandscape;
