import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import {MDBBtn, MDBCol, MDBContainer, MDBNavbar, MDBRow} from "mdb-react-ui-kit";
import {request} from "../api/axiosHelper";
import CouponCard from "../components/CouponCard";
import CustomerNavbar from "../components/CustomerNavbar/CustomerNavbar";

const CustomerFeed = () => {

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
                <MDBRow>
                    <MDBCol className="col-md-4 mb-4">
                        {coupons.map((coupon) => (
                            <CouponCard
                                coupon={coupon}
                                addToCart = {addToCart}
                            /> // Assuming you have a unique identifier like 'id'
                        ))}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default CustomerFeed;
