import React from 'react';
import { Table } from 'react-bootstrap';
import CartItem from './CartItem';

function CartTable({cartList}) {

    const renderCartItems = () => {
        return cartList.map(cartItem => {
            return <CartItem key={cartItem.bookID} cartItem={cartItem}/>
        })
    }

    return (
        <div className="cart-table">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderCartItems()}
                </tbody>
            </Table>
        </div>
    )
}

export default CartTable
