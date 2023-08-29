import React, {useEffect, useState} from 'react';
import {
    MDBCol,
    MDBContainer,

    MDBRow
} from "mdb-react-ui-kit";
import {request} from "../api/axiosHelper";
import CouponCard from "../components/CouponCard";
import CustomerNavbar from "../components/CustomerNavbar/CustomerNavbar";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import CartPage from "../components/cartPage/CartPage";
import CheckoutPage from "../components/checkoutPage/CheckoutPage";


const CustomerPage = () => {

    const [coupons, setCoupons] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCoupons();
        retrieveCartFromSessionStorage();
    }, []);
    const fetchCoupons = async () => {
        try {
            const response = await request('GET', '/api/coupons/getAllCoupons', {});
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };
    const retrieveCartFromSessionStorage = () => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    };
    const addToCart = (coupon) => {
        if(cartItems.includes(coupon))
            return;
        const updatedCart = [...cartItems, coupon];
        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div>
            <CustomerNavbar cartItemCount={cartItems.length}></CustomerNavbar>
            <MDBContainer className="py-5 h-100">
                <h2>Customer Content</h2>
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {coupons.map((coupon) => (
                        <MDBCol>
                        <CouponCard
                            coupon={coupon}
                            addToCart = {addToCart}
                        />
                        </MDBCol>

                    ))}
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default CustomerPage;
