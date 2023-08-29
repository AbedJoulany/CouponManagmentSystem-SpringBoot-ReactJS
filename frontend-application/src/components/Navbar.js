import React from "react";
import {
    MDBNavbar,
    MDBBtn,
    MDBContainer
} from 'mdb-react-ui-kit';
import {request} from "../api/axiosHelper";

const Navbar  = () =>{

    const handleLogout  = async (e) => {
        try {
            const response = await request('DELETE', `/api/auth/logout`, {});

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <MDBNavbar light bgColor='light'>
            <MDBContainer tag="form" fluid className='justify-content-start'>
                <MDBBtn
                    className='me-3'
                    type='button'
                    onSubmit={handleLogout}
                >
                    Logout
                </MDBBtn>
            </MDBContainer>
        </MDBNavbar>
    );
}



export default Navbar;