import React, { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";

const CheckoutForm = ({onSubmit }) => {

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the onSubmit function with form data
        onSubmit({
        });
    };

    return (
        <MDBContainer fluid className="py-5 gradient-custom">
                    <MDBCard style={{ borderRadius: "15px" }}>
                        <MDBCardBody className="p-4">
                            <MDBRow className="d-flex align-items-center">
                                <MDBCol size="9">
                                    <MDBInput
                                        label="Card Number"
                                        id="form1"
                                        type="text"
                                        placeholder="1234 5678 9012 3457"
                                    />
                                </MDBCol>
                                <MDBCol size="3">
                                    <img
                                        src="https://img.icons8.com/color/48/000000/visa.png"
                                        alt="visa"
                                        width="64px"
                                    />
                                </MDBCol>

                                <MDBCol size="9">
                                    <MDBInput
                                        label="Cardholder's Name"
                                        id="form2"
                                        type="text"
                                        placeholder="Cardholder's Name"
                                    />
                                </MDBCol>

                                <MDBCol size="6">
                                    <MDBInput
                                        label="Expiration"
                                        id="form2"
                                        type="text"
                                        placeholder="MM/YYYY"
                                    />
                                </MDBCol>
                                <MDBCol size="3">
                                    <MDBInput
                                        label="CVV"
                                        id="form2"
                                        type="text"
                                        placeholder="&#9679;&#9679;&#9679;"
                                    />
                                </MDBCol>
                                <MDBCol size="3">
                                    <MDBBtn color="info" rounded size="lg" onClick={handleSubmit}>
                                        <MDBIcon fas icon="arrow-right" />
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
        </MDBContainer>
    );
};

export default CheckoutForm;
