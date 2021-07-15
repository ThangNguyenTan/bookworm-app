import React, {useEffect} from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions';
import { CartTable } from '../../components/Cart';
import { ErrorBox, LoadingBox } from '../../components/Partials';

function OrderDetails(props) {
    const orderID = props.match.params.orderID;
    const dispatch = useDispatch();
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer);
    const { loading, error, order } = orderDetailsReducer;

    useEffect(() => {
        dispatch(getOrderDetails(orderID));
    }, [dispatch]);

    const renderCartSummary = () => {
        return (
            <Card.Body>
                <h3>${order.order_amount}</h3>
            </Card.Body>
        );
    };

    if (error) {
        return <ErrorBox message={error} />;
    }

    if (loading) {
        return <LoadingBox />;
    }

    return (
        <div id="cart-page">
            <div className="page-header">
                <Container>
                    <h2>Order Details: {order.order_items.length} items</h2>
                </Container>
            </div>

            <div className="container">
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <CartTable cartList={order.order_items} disableUtils/>
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
    )
}

export default OrderDetails
