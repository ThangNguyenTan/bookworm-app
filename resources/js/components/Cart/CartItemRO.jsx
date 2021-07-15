import React from "react";

function CartItem({ cartItem }) {
    const currentURL = location.protocol + "//" + location.host;
    const {
        book,
        price,
        quantity,
    } = cartItem;
    const {
        book_title,
        author,
        book_cover_photo
    } = book;

    const toPrice = (num) => {
        return num.toFixed(2);
    }

    let sub_total = toPrice(parseInt(quantity) * parseFloat(price))

    const renderQuantityUtils = () => {
        return <p>{quantity}</p>;
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
                    <h5>{book_title}</h5>
                    <p>{author.author_name}</p>
                </div>
            </td>
            <td className="cart-item__price">
                <h6 className="default-price">${price}</h6>
            </td>
            <td className="cart-item__quantity">{renderQuantityUtils()}</td>
            <td className="cart-item__total">
                <h6>${sub_total}</h6>
            </td>
        </tr>
    );
}

export default CartItem;
