import React, { useState } from 'react';


import {
    MDBInput,
    MDBCol,
    MDBRow, MDBBtn,
} from 'mdb-react-ui-kit';


const CustomerForm = ({ handleSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        handleSubmit(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            },
            e
        );
    };

    return (
        <form onSubmit={handleFormSubmit} id="form1">
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput id='customer-first-name'
                              label='First name'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                    />
                </MDBCol>
                <MDBCol>
                    <MDBInput id='customer-last-name'
                              label='Last name'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)} />
                </MDBCol>
            </MDBRow>
            <MDBInput className='mb-4' type='email' id='customer-email' label='Email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput className='mb-4' type='password' id='customer-password' label='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn type="submit">Save</MDBBtn>
        </form>
    );
};

export default CustomerForm;
