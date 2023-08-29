import React from 'react';
import CartItem from '../cartPage/CartItem';

const CheckoutSummary = ({ cartItems, calculateTotalAmount }) => {
    return (
        <div >
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge rounded-pill badge-primary">{cartItems.length}</span>
            </h4>

            <ul className="list-group mb-3">
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} removeFromCart={()=>{}}
                              showRemove={false}/>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${calculateTotalAmount(cartItems).toFixed(2)}</strong>
                </li>
            </ul>
        </div>
    );
};

export default CheckoutSummary;
