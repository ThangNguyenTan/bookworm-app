import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../actions/orderActions";
import CartTable from "../components/cart/CartTable";
import ErrorBox from "../components/Partials/ErrorBox";
import LoadingBox from "../components/partials/LoadingBox";

function Cart() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartReducer);
    const { loading, error } = useSelector((state) => state.orderActionReducer);

    const toPrice = (num) => {
        return num.toFixed(2);
    };

    const totalPrice = toPrice(
        cart.reduce((a, c) => {
            return a + c.quantity * parseFloat(c.book_price);
        }, 0)
    );

    const handlePlaceOrder = () => {
        dispatch(placeOrder({ totalPrice }));
    };

    const renderCartSummary = () => {
        if (error) {
            return <ErrorBox message={error} />;
        }

        if (loading) {
            return <LoadingBox />;
        }

        return (
            <Card.Body>
                <h3>${totalPrice}</h3>
                <button
                    onClick={handlePlaceOrder}
                    className="button dark block mt-3"
                >
                    Place Order
                </button>
            </Card.Body>
        );
    };

    if (cart.length === 0) {
        return (
          <div id="cart-page">
            <div className="container text-center">
                <div style={{
                    marginTop: "100px"
                }}>
                    <div>
                        <h2>{`Currently you don't have any items`}</h2>
                        <Link to="/shop" className="button primary mt-3">Go to Shop</Link>
                    </div>
                </div>
            </div>
          </div>
        );
      }

    return (
        <div id="cart-page">
            <div className="page-header">
                <Container>
                    <h2>Your cart: {cart.length} items</h2>
                </Container>
            </div>

            <div className="container">
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <CartTable cartList={cart} />
                    </Col>
                    <Col lg={4} md={12} sm={12} className="cart-summary">
                        <Card className="text-center">
                            <Card.Header>
                                <h4>Cart Totals</h4>
                            </Card.Header>
                            {renderCartSummary()}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Cart;