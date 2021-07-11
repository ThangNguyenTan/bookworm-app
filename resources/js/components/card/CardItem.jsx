import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Card } from "react-bootstrap";
import LazyLoad from 'react-lazyload';

function CardItem(props) {
    const dispatch = useDispatch();
    const item = props.item;
    const {
        discount_price,
        original_price,
        title,
        author_name,
        author_id,
        cover_photo,
        id
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
                    book_og_price: original_price,
                    book_price: discount_price,
                    book_cover_photo: cover_photo,
                    author: {
                        author_name: author_name,
                        id: author_id
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
        <Card className="card-item">
            <Link to={`/books/${id}`}>
                <LazyLoad height={200}>
                    <Card.Img
                        variant="top"
                        src={
                            cover_photo
                                ? `./images/bookcover/${cover_photo}.jpg`
                                : "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg"
                        }
                    />
                </LazyLoad>
            </Link>
            <Card.Body>
                <Card.Title>
                    <Link to={`/books/${id}`}>
                        {title}
                    </Link>
                </Card.Title>
                <Card.Text>
                    <h6 className="author">{author_name}</h6>
                    {renderPriceTag()}
                </Card.Text>
                {renderAddToCartButton()}
            </Card.Body>
        </Card>
    );
}

export default CardItem;
