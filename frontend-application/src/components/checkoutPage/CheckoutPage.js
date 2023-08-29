import React, { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css'
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import {request} from "../../api/axiosHelper";
const CheckoutPage = () => {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // Function to handle form submission
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        retrieveCartFromSessionStorage();
    }, []);
    const retrieveCartFromSessionStorage = () => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    };
    const calculateTotalAmount = (items) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };
    const clearCart = ()=>{
        setCartItems([]);
        sessionStorage.setItem('cart',JSON.stringify([]));
    }

    // Use effect hook to handle success message display and redirection
    useEffect(() => {
        let timer;
        if (showSuccessMessage) {
            // Set a timer to navigate back to the home page after 5 seconds
            timer = setTimeout(() => {
                navigate('/customer');
            }, 5000);
        }
        return () => {
            // Clear the timer when the component unmounts
            clearTimeout(timer);
        };
    }, [showSuccessMessage, navigate]);

    const handleSubmit = async (formData) => {
        try {
            const response = await request('POST', '/api/customer/purchaseCoupons', cartItems);
            if(response.status === 200)
            {
                setShowSuccessMessage(true);
                clearCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Checkout Page</h2>

            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>
                    {!showSuccessMessage && <strong>Your cart is empty. Go shop for products.</strong>}
                </p>
            ) : (
                <MDBRow>
                    <MDBCol className=" mb-4">
                        <CheckoutForm onSubmit={handleSubmit} />
                    </MDBCol>
                    <MDBCol className="mb-4">
                    <CheckoutSummary cartItems={cartItems} calculateTotalAmount={calculateTotalAmount} />
                    </MDBCol>
                </MDBRow>
            )}

            {showSuccessMessage && (
                <div className="success-message">
                    <p>Purchase succeeded</p>
                    <p>Redirecting to the home page...</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
