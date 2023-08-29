import React, { useState } from 'react';
import {
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import AuthService from '../api/AuthService';
import {request, setAuthToken} from "../api/axiosHelper";
import axios from "axios"; // Import the AuthService

const Login = () => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        selectedClientType: 'Administrator',
    });

    const clientTypeOptions = [
        { value: 0, text: 'Administrator' },
        { value: 1, text: 'Company' },
        { value: 2, text: 'Customer' },
    ];
    const [loginError, setLoginError] = useState(false); // State to track login errors
    const navigate = useNavigate(); // Initialize history

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password, selectedClientType} = formValue;
        request("POST",
            "http://localhost:8080/api/auth/authenticate",
            {
                email: email,
                password: password,
                role: selectedClientType,
            }).then((response) => {
            const accessToken = response.data.access_token;
            setAuthToken(accessToken);
            if (selectedClientType === '0') {
                navigate("/admin/dashboard")
            }else if(selectedClientType === '1') {
                navigate("/company/dashboard")
            }
            else if(selectedClientType === '2'){
                    navigate("/customer/feed")
            }
        }).catch((error) => {
            console.error('Login error:', error);
            setLoginError(true);
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));
    };

    const onSelectChange = (e) => {
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            selectedClientType: e.target.value,
        }));
    };

    return (
        <MDBContainer className="py-5 h-100">
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-5">Sign in</h3>

                            {loginError && ( // Display error message conditionally
                                <div className="alert alert-danger" role="alert">
                                    Login failed. Please check your credentials.
                                </div>
                            )}

                            <form className="g-3" onSubmit={handleLogin}>
                                <div className="form-outline mb-4">
                                    <MDBInput
                                        value={formValue.email}
                                        name="email"
                                        onChange={onChange}
                                        id="emailValidation"
                                        required
                                        label="Email"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <MDBInput
                                        type="password"
                                        value={formValue.password}
                                        name="password"
                                        onChange={onChange}
                                        id="passwordValidation"
                                        required
                                        label="Password"
                                        autocomplete="on"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <select
                                        value={formValue.selectedClientType}
                                        onChange={onSelectChange}
                                        name="selectedClientType"
                                        className="form-select mb-3"
                                        required
                                    >
                                        {clientTypeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit">Sign In</MDBBtn>
                                </div>
                            </form>
                            <hr className="my-4" />
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
