import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import OrderTable from "../components/order/OrderTable";
import ErrorBox from "../components/Partials/ErrorBox";
import LoadingBox from "../components/partials/LoadingBox";

function Profile() {
    const dispatch = useDispatch();

    const orderListReducer = useSelector((state) => state.orderListReducer);
    const { loading, error, orders } = orderListReducer;

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch])

    const renderOrderTable = () => {
        if (error) {
            return <ErrorBox message={error} />;
        }
    
        if (loading) {
            return <LoadingBox />;
        }

        return <OrderTable orderList={orders}/>
    }

    return (
        <div id="profile-page">
            <div className="page-header">
                <Container>
                    <h2>Order History</h2>
                </Container>
            </div>

            <Container>
                {renderOrderTable()}
            </Container>
        </div>
    );
}

export default Profile;
