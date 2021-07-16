import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

function OrderItem({orderItem}) {

    const {order_date, order_amount, id, order_items} = orderItem;

    return (
        <tr className="order-item">
            <td>
                #{id}
            </td>
            <td>
                {moment(new Date(order_date).getTime()).format('MMMM Do, YYYY')}
            </td>
            <td>
                {order_items.length} items
            </td>
            <td>
                ${order_amount}
            </td>
            <td>
                <Link className="btn btn-dark" to={`orders/${id}`}>Details</Link>
            </td>
        </tr>
    )
}

export default OrderItem
