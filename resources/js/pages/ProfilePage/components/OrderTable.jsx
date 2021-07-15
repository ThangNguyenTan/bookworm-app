import React from 'react';
import { Table } from 'react-bootstrap';
import { OrderItem } from '.';

function OrderTable({orderList}) {

    const renderOrderItems = () => {
        return orderList.map(orderItem => {
            return <OrderItem key={orderItem.id} orderItem={orderItem}/>
        })
    }

    return (
        <div className="order-table">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Number of Items</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderOrderItems()}
                </tbody>
            </Table>
        </div>
    )
}

export default OrderTable
