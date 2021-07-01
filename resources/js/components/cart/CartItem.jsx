import React from "react";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../../actions/cartActions";

function CartItem({ cartItem }) {
    const dispatch = useDispatch();
    const currentURL = location.protocol + "//" + location.host;
    const {
        book_title,
        author,
        book_price,
        book_cover_photo,
        quantity,
        bookID,
        sub_total,
    } = cartItem;

    const handleQuantityUpdate = (qty) => {
        dispatch(changeQuantity(bookID, qty));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(bookID));
    }

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
                        <h5>{book_title}</h5>
                        <p>{author.author_name}</p>
                    </div>
            </td>
            <td className="cart-item__price">
                <h6 className="default-price">${book_price}</h6>
            </td>
            <td className="cart-item__quantity">
                <div className="quantity-container">
                    <div
                        className="decrement"
                        onClick={() => {
                            if (quantity === 1) {
                                return;
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
                            onChange={(e) => {
                                handleQuantityUpdate(parseInt(e.target.value));
                            }}
                            required
                        />
                    </div>
                    <div
                        className="increment"
                        onClick={() => {
                            if (quantity === 8) {
                                return;
                            }
                            handleQuantityUpdate(parseInt(quantity) + 1);
                        }}
                    >
                        +
                    </div>
                </div>
            </td>
            <td className="cart-item__total"><h6>${sub_total}</h6></td>
            <td className="cart-item__action">
                <i onClick={handleRemoveFromCart} className="fas fa-times"></i>
            </td>
        </tr>
    );
}

export default CartItem;
