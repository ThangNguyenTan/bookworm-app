import React from 'react';
import { Table } from 'react-bootstrap';
import { CartItemRO, CartItem } from '.';

function CartTable({cartList, disableUtils}) {

    const renderCartItems = () => {
        return cartList.map(cartItem => {
            const bookID = cartItem.bookID || cartItem.book_id;
            if (disableUtils) {
                return <CartItemRO key={bookID} cartItem={cartItem}/>
            }
            return <CartItem key={bookID} cartItem={cartItem}/>
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
                        {disableUtils ? <></> : <th></th>}
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
