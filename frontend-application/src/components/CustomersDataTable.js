import React, { useState, useEffect } from 'react';
import { request } from '../api/axiosHelper';
import DataTable from 'react-data-table-component';
import CustomerForm from "./CustomerForm";
import axios from 'axios';

import {
    MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle, MDBRow, MDBCol,
} from 'mdb-react-ui-kit';
import CompanyForm from "./CompanyForm";

const CustomersDataTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [basicModal, setBasicModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
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

    useEffect(() => {
        fetchCustomers();
    }, []); // Fetch customers when the component mounts

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setEditMode(true);
        toggleShow(); // Open the modal
    };
    const handleDeleteClick = async (customer) => {
        console.log("id", customer.id)
        try {
            const response = await request('DELETE', `/api/admin/deleteCustomer?id=${customer.id}`, {});
            if (response.status === 200) {
                // Delete the company from the companies list
                const updatedCustomers = customers.filter(c => c.id !== customer.id);
                setCustomers(updatedCustomers);
            } else {
                console.error('Failed to delete company:', response.data);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };
    const toggleShow = () => setBasicModal(!basicModal);
    const fetchCustomers = async () => {
        try {
            const response = await request('GET', '/api/admin/getAllCustomers', {});
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };


    const columns = [
        { name: 'First Name', selector: 'firstName', sortable: true },
        { name: 'Last Name', selector: 'lastName', sortable: true },
        { name: 'Email', selector: 'email', sortable: true },
        { name: 'Password', selector: 'password', sortable: true },
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

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSubmit = async (customerData, event) => {
        event.preventDefault(); // Prevent page refresh
        try {
            if (editMode && selectedCustomer) {
                const updatedCustomerData = { ...customerData, id: selectedCustomer.id };
                const response = await request('PUT', `/api/admin/updateCustomer`, updatedCustomerData);
                setSuccessMessage('Customer saved successfully!');
            } else {
                const response = await request('POST', '/api/admin/addCustomer', customerData);
                setSuccessMessage('Customer added successfully!');
            }
            fetchCustomers(); // Fetch updated data
        } catch (error) {
            console.error('Error adding/updating customer:', error);
        }
    };

    return (

        <div className="my-4">
            <MDBRow className="d-flex justify-content-end align-items-center">
                <MDBCol className="p-2">
                    <MDBInput
                        id ="customer-search"
                        label="Search..."
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                    />
                </MDBCol>
                <MDBCol className="p-2">
                    <MDBBtn color="primary" onClick={toggleShow}>
                        <MDBIcon fas icon="plus" /> Add Customer
                    </MDBBtn>
                </MDBCol>
            </MDBRow>

            <DataTable
                title="Customers"
                columns={columns}
                data={filteredCustomers}
                pagination
            />
            <MDBModal  show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New User</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <hr />
                        <MDBModalBody>
                            <CustomerForm
                                handleSubmit={handleSubmit}/>
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
        </div>
    );
};

export default CustomersDataTable;
