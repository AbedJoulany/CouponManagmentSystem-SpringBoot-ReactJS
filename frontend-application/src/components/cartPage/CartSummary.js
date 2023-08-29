import React from 'react';
import {Link} from "react-router-dom";

const CartSummary = ({ totalAmount }) => {
    return (
        <div className="card mb-4">
            <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>${totalAmount.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Jerusalem</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                            <strong>Total amount</strong>
                        </div>
                        <span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </span>
                    </li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg btn-block">
                    <Link to="/checkout" className="btn btn-primary checkout-button">
                        Go to Checkout
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default CartSummary;
