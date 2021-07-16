import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getBookDetails } from "../../actions";
import { AlertBox, ErrorBox, LoadingBox } from "../../components/Partials";
import { ReviewForm, ReviewList } from "../../components/Review";

function BookDetails(props) {
    const bookID = props.match.params.bookID;
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartReducer);
    const bookDetailsReducer = useSelector((state) => state.bookDetailsReducer);
    const { loading, error, book } = bookDetailsReducer;
    
    
    const [quantity, setQuantity] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [alertBoxContainer, setAlertBoxContainer] = useState(<></>);

    const currentURL = location.protocol + "//" + location.host;

    useEffect(() => {
        if (isAddedToCart) {
            setAlertBoxContainer(
                <AlertBox isShowed={true} message={"Added to cart"} />
            );
        }
    }, [isAddedToCart]);

    const renderPriceTag = () => {
        const { discount_price, book_price } = book;

        if (discount_price == book_price) {
            return <h2 className="price">${book_price}</h2>;
        }

        return (
            <h2 className="price">
                ${discount_price}
                <span>${book_price}</span>
            </h2>
        );
    };

    const handleAddToCart = () => {
        //console.log(bookItem)
        dispatch(
            addToCart(
                {
                    book_title: book.book_title,
                    book_og_price: book.book_price,
                    book_price: book.discount_price,
                    book_cover_photo: book.book_cover_photo,
                    author: {
                        author_name: book.author_name,
                        id: book.author_id
                    },
                    id: book.id,
                },
                quantity
            )
        );

        setIsAddedToCart(true);
    };

    const renderAddToCartButton = () => {
        if (cart) {
            const existed = cart.find((cartItem) => {
                return cartItem.bookID === book.id;
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
            <>
                <label htmlFor="quantity">Quantity</label>
                <div className="quantity-container">
                    <div
                        className="decrement"
                        onClick={() => {
                            if (quantity === 1) {
                                return;
                            }
                            setQuantity((prev) => prev - 1);
                        }}
                    >
                        -
                    </div>
                    <div className="quantity-input">
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            max={8}
                            value={quantity}
                            disabled
                            required
                        />
                    </div>
                    <div
                        className="increment"
                        onClick={() => {
                            if (quantity >= 8) {
                                return setQuantity(8);
                            }
                            setQuantity((prev) => prev + 1);
                        }}
                    >
                        +
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-dark btn-block mt-4"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>
            </>
        );
    };

    useEffect(() => {
        dispatch(getBookDetails(bookID));
        //dispatch(getReviewsByBookID(bookID));
    }, [dispatch]);

    if (error) {
        return <ErrorBox message={error} />;
    }

    if (loading) {
        return <LoadingBox />;
    }

    return (
        <div id="book-details-page">
            <div className="page-header">
                <Container>
                    <h2>Book Details</h2>
                </Container>
            </div>

            <Container>
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <div className="book-details__card">
                            <Card className="card-item landscape">
                                <Row className="no-gutters">
                                    <Col md={4}>
                                        <Card.Img
                                            width="100%"
                                            variant="top"
                                            src={
                                                book.book_cover_photo
                                                    ? `${currentURL}/images/bookcover/${book.book_cover_photo}.jpg`
                                                    : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                                            }
                                            alt={book.book_title}
                                        />
                                        <h6>
                                            <span>By (author) </span>
                                            {book.author_name}
                                        </h6>
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title>
                                                <h2>{book.book_title}</h2>
                                            </Card.Title>
                                            <Card.Text>
                                                <p>{book.book_summary}</p>
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Eos dolor soluta
                                                    ullam, exercitationem
                                                    reiciendis ipsa nemo
                                                    inventore in quas expedita
                                                    nesciunt natus deleniti
                                                    blanditiis officia incidunt,
                                                    sed autem perspiciatis
                                                    maxime?
                                                </p>
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Eos dolor soluta
                                                    ullam, exercitationem
                                                    reiciendis ipsa nemo
                                                    inventore in quas expedita
                                                    nesciunt natus deleniti
                                                    blanditiis officia incidunt,
                                                    sed autem perspiciatis
                                                    maxime?
                                                </p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>

                    <Col lg={4} md={12} sm={12}>
                        <div className="book-details__utils">
                            <Card>
                                <Card.Header>{renderPriceTag()}</Card.Header>
                                <Card.Body>
                                    {alertBoxContainer}
                                    {renderAddToCartButton()}
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <ReviewList
                            bookID={bookID}
                        />
                    </Col>

                    <Col lg={4} md={12} sm={12}>
                        <ReviewForm bookID={bookID} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BookDetails;
