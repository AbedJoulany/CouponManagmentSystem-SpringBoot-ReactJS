import React, {useEffect, useState} from 'react';

import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';


const CompanyForm = ({ handleSubmit, editMode, initialName }) => {
    const [companyName, setCompanyName] = useState(initialName);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setCompanyName(initialName);
    }, [initialName]);
    const handleFormSubmit = (e) => {
        handleSubmit(
            {
                name: companyName,
                email: email,
                password: password,
            },
            e
        );
    };


    return (
        <form onSubmit={handleFormSubmit} id="form2">
            <MDBInput className='mb-4' id='company-name'
                      label='Company name'
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={editMode} // Disable email input when editing

            />
            <MDBInput className='mb-4' type='email' id='company-email' label='Email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput className='mb-4' type='password' id='company-password' label='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn type="submit">Save</MDBBtn>
        </form>
    );
};

export default CompanyForm;
