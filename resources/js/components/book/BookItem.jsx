import React from "react";
import { Link } from "react-router-dom";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";

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

    if (bookItem) {
        return (
            <div className="book-item">
                <Link to={`/books/${bookItem.id}`} className="book-item__image">
                    {bookItem.book_cover_photo ? (
                        <img
                            src={`./images/bookcover/${bookItem.book_cover_photo}.jpg`}
                            alt={bookItem.book_title}
                            className="img-fluid"
                        />
                    ) : (
                        <img
                            src={`https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg`}
                            alt={bookItem.book_title}
                            className="img-fluid"
                        />
                    )}
                </Link>
                <Link
                    to={`/books/${bookItem.id}`}
                    className="book-item__content"
                >
                    <h5>{bookItem.book_title}</h5>
                    <h6>{bookItem.author.author_name}</h6>
                    <h4>${bookItem.book_price}</h4>
                </Link>
                <div className="book-item__footer">
                    {renderAddToCartButton()}
                </div>
            </div>
        );
    }

    return (
        <div className="book-item">
            <Link to="/books/bookID" className="book-item__image">
                <img
                    src="https://d3i5mgdwi2ze58.cloudfront.net/kxk6iwn543doz8jqbs2sckh2fcot"
                    alt="One Hundred Years of Solitude"
                    className="img-fluid"
                />
            </Link>
            <Link to="/books/bookID" className="book-item__content">
                <h5>One Hundred Years of Solitude</h5>
                <h6>Gabriel Garcia Marquez</h6>
                <h4>$29.00</h4>
            </Link>
            <div className="book-item__footer">
                <ul className="row">
                    <li>
                        <ShoppingBasketOutlinedIcon />
                    </li>
                    <li>
                        <FavoriteBorderOutlinedIcon />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BookItem;
