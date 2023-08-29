import React from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBBadge, MDBContainer, MDBIcon,

} from 'mdb-react-ui-kit';

import {useNavigate} from "react-router-dom";

const CouponCard = ({coupon,addToCart}) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const startDateFormatted = new Date(coupon.startDate).toLocaleDateString(undefined, options);
    const endDateFormatted = new Date(coupon.endDate).toLocaleDateString(undefined, options);

    const navigate = useNavigate(); // Initialize history
    const handleAddToCart = (coupon) => {
        addToCart(coupon);
        console.log(coupon.company.name)
        //setMessage('Item added to cart!');
        //setShowNotification(true);
    };

    const handleBuyNow = (coupon) => {
        addToCart(coupon);
        navigate("/cart");
    };

    return (
        <MDBCard>
            <MDBCardImage position='top' alt='...' src={coupon.image} />
            <MDBCardBody>
                <MDBCardTitle className="d-flex justify-content-between">
                    <h3>{coupon.title}</h3>
                    <h3>{coupon.company.name}</h3>
                </MDBCardTitle>
                <MDBCardText>
                    <h6 className="text-muted">{coupon.description}</h6>
                </MDBCardText>

                <div className="d-flex justify-content-start">
                    <h5>{coupon.category}</h5>
                </div>
                <div className="d-flex justify-content-between ">
                    <p><strong>start-expiration:</strong> {startDateFormatted} - {endDateFormatted}</p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Available: {coupon.amount}</h5>
                    <h5 className="text-dark mb-0"> <MDBBadge className='text-dark me-2' color='warning' light>
                        ${coupon.price}
                    </MDBBadge></h5>
                </div>
                <div className="d-flex justify-content-start align-items-center pb-2 mb-1">
                    <MDBBtn onClick={() => handleBuyNow(coupon)}>Buy now</MDBBtn>
                    <MDBBtn className='m-1' style={{ backgroundColor: '#ffac44' }} onClick = {() => handleAddToCart(coupon)}>
                        <MDBIcon fas icon="cart-plus" />
                    </MDBBtn>
                </div>
            </MDBCardBody >
        </MDBCard>
    );
}
export default CouponCard;
