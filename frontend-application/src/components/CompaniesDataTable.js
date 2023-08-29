import React, { useState, useEffect } from 'react';
import { request } from '../api/axiosHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

import {
    MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle, MDBContainer, MDBCol, MDBRow,
} from 'mdb-react-ui-kit';
import CompanyForm from "./CompanyForm";

const CompaniesDataTable = () => {
    const [companies, setCompanies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [basicModal, setBasicModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const toggleShow = () => setBasicModal(!basicModal);

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage('');
                toggleShow(); // Close the modal
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setEditMode(true);
        toggleShow(); // Open the modal
    };
    const handleDeleteClick = async (company) => {
        try {
            const response = await request('DELETE', `/api/admin/deleteCompany?id=${company.id}`, {});
            if (response.status === 200) {
                // Delete the company from the companies list
                const updatedCompanies = companies.filter(c => c.id !== company.id);
                setCompanies(updatedCompanies);
            } else {
                console.error('Failed to delete company:', response.data);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await request('GET', '/api/admin/getAllCompanies', {});
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []); // Fetch customers when the component mounts

    const columns = [
        { name: 'Name', selector: (row) => row.name, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Password', selector: (row) => row.password, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <MDBBtn  tag='a' color='none' className='m-1'>
                        <MDBIcon  fas icon="user-edit"
                                  onClick={handleEditClick.bind(this, row)}
                                   />
                    </MDBBtn>
                    <MDBBtn  tag='a' color='none' className='m-1' style={{ color: '#dd4b39' }}>
                        <MDBIcon fas icon="trash-alt"
                                 onClick={handleDeleteClick.bind(this, row)}
                        />
                    </MDBBtn>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const filteredCompanies = companies.filter(
        (company) =>
            company.name.toLowerCase().includes(searchText.toLowerCase()) ||
            company.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSubmit = async (companyData, event) => {
        event.preventDefault(); // Prevent page refresh
        try {
            if (editMode && selectedCompany) {
                const updatedCompanyData = { ...companyData, id: selectedCompany.id };
                const response = await request('PUT', `/api/admin/updateCompany`, updatedCompanyData);
                setSuccessMessage('Company saved successfully!');
            } else {
                const response = await request('POST', '/api/admin/addCompany', companyData);
                setSuccessMessage('Company added successfully!');
            }
            fetchCompanies(); // Fetch updated data
        } catch (error) {
            console.error('Error adding/updating company:', error);
        }
    };

    return (
        <MDBContainer className="my-4">
            <MDBRow className="d-flex justify-content-end align-items-center">
                <MDBCol className="p-2">
                    <MDBInput
                        id ="company-search"
                        label="Search..."
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                    />
                </MDBCol>
                <MDBCol className="p-2">
                    <MDBBtn color="primary" onClick={toggleShow}>
                        <MDBIcon fas icon="plus" /> Add Company
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
            <DataTable
                title="Companies"
                columns={columns}
                data={filteredCompanies}
                pagination
            />
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Company</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <hr />
                        <MDBModalBody>
                            <CompanyForm
                                handleSubmit={handleSubmit}
                                editMode={editMode}
                                initialName={selectedCompany ? selectedCompany.name : ''}
                            />
                            {successMessage && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {successMessage}
                                </div>
                            )}
                        </MDBModalBody>
                        <hr />
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </MDBContainer>
    );
};

export default CompaniesDataTable;
