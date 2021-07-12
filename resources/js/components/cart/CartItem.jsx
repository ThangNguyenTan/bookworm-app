import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity, removeFromCart } from "../../actions";

function CartItem({ cartItem }) {
    const dispatch = useDispatch();
    const currentURL = location.protocol + "//" + location.host;
    const {
        book_title,
        author,
        book_price: discount_price,
        book_og_price: book_price,
        book_cover_photo,
        quantity,
        bookID,
        sub_total,
    } = cartItem;

    const renderPriceTag = () => {
        if (discount_price == book_price) {
            return <h6 className="price">${book_price}</h6>;
        }

        return (
            <h6 className="price">
                ${discount_price}
                <span>${book_price}</span>
            </h6>
        );
    };

    const handleQuantityUpdate = (qty) => {
        dispatch(changeQuantity(bookID, qty));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(bookID));
    };

    const renderQuantityUtils = () => {
        return (
            <div className="quantity-container">
                <div
                    className="decrement"
                    onClick={() => {
                        if (quantity === 1) {
                            return handleRemoveFromCart();
                        }
                        handleQuantityUpdate(parseInt(quantity) - 1);
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
                            return handleQuantityUpdate(8);
                        }
                        handleQuantityUpdate(parseInt(quantity) + 1);
                    }}
                >
                    +
                </div>
            </div>
        );
    };

    const renderActionUtils = () => {
        return (
            <td className="cart-item__action">
                <i onClick={handleRemoveFromCart} className="fas fa-times"></i>
            </td>
        );
    };

    return (
        <tr className="cart-item">
            <td className="cart-item__product">
                <div className="image">
                    <img
                        src={
                            book_cover_photo
                                ? `${currentURL}/images/bookcover/${book_cover_photo}.jpg`
                                : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                        }
                        alt={book_title}
                        className="img-fluid"
                    />
                </div>
                <div className="content">
                    <Link to={`/books/${bookID}`} target="_blank" rel="noopener noreferrer">
                        <h5>{book_title}</h5>
                    </Link>
                    <p>{author.author_name}</p>
                </div>
            </td>
            <td className="cart-item__price">{renderPriceTag()}</td>
            <td className="cart-item__quantity">{renderQuantityUtils()}</td>
            <td className="cart-item__total">
                <h6>${sub_total}</h6>
            </td>
            {renderActionUtils()}
        </tr>
    );
}

export default CartItem;
