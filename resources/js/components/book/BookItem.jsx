import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Card } from "react-bootstrap";

function BookItem(props) {
    const dispatch = useDispatch();
    const bookItem = props.bookItem;

    const { cart } = useSelector((state) => state.cartReducer);

    const renderPriceTag = () => {
        if (bookItem.discount_price == bookItem.book_price) {
            return <h4 className="price">${bookItem.book_price}</h4>;
        }

        return (
            <h4 className="price">
                ${bookItem.discount_price}
                <span>${bookItem.book_price}</span>
            </h4>
        );
    };

    const handleAddToCart = () => {
        //console.log(bookItem)
        dispatch(
            addToCart(
                {
                    book_title: bookItem.book_title,
                    book_og_price: bookItem.book_price,
                    book_price: bookItem.discount_price,
                    book_cover_photo: bookItem.book_cover_photo,
                    author: bookItem.author,
                    id: bookItem.id,
                },
                1
            )
        );
    };

    const renderAddToCartButton = () => {
        if (cart) {
            const existed = cart.find((cartItem) => {
                return cartItem.bookID === bookItem.id;
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
        <Card className="book-item">
            <Link to={`/books/${bookItem.id}`}>
                <Card.Img
                    variant="top"
                    src={
                        bookItem.book_cover_photo
                            ? `./images/bookcover/${bookItem.book_cover_photo}.jpg`
                            : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                    }
                />
            </Link>
            <Card.Body>
                <Card.Title>
                    <Link to={`/books/${bookItem.id}`}>
                        {bookItem.book_title}
                    </Link>
                </Card.Title>
                <Card.Text>
                    <h6 className="author">{bookItem.author ? bookItem.author.author_name : bookItem.author_name}</h6>
                    {renderPriceTag()}
                </Card.Text>
                {renderAddToCartButton()}
            </Card.Body>
        </Card>
    );
}

export default BookItem;
