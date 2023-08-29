import React, { useState, useEffect } from 'react';
import { request } from '../api/axiosHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

import {
    MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle, MDBContainer, MDBRow, MDBCol,
} from 'mdb-react-ui-kit';
import CompanyCouponsForm from "./CompanyCouponsForm";

const CouponsDataTable = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [basicModal, setBasicModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

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

    const handleEditClick = (coupon) => {
        setSelectedCoupon(coupon);
        setEditMode(true);
        toggleShow(); // Open the modal
    };
    const handleDeleteClick = async (coupon) => {
        try {
            const response = await request('DELETE', `/api/company/deleteCoupon?id=${coupon.id}`, {});
            if (response.status === 200) {
                // Delete the company from the companies list
                const updatedCoupons = coupons.filter(c => c.id !== coupon.id);
                setCoupons(updatedCoupons);
            } else {
                console.error('Failed to delete coupon:', response.data);
            }
        } catch (error) {
            console.error('Failed to delete coupon:', error);
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await request('GET', '/api/company/getCompanyCoupons', {});
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []); // Fetch customers when the component mounts

    const columns = [
        { name: 'Title', selector: (row) => row.title, sortable: true },
        { name: 'Description', selector: (row) => row.description, sortable: true },
        { name: 'price', selector: (row) => row.price, sortable: true },
        { name: 'category', selector: (row) => row.category, sortable: true },
        { name: 'image', selector: (row) => row.image, sortable: true },
        { name: 'startDate', selector: (row) => new Date(row.startDate).toLocaleDateString(), sortable: true },
        { name: 'endDate', selector: (row) => new Date(row.endDate).toLocaleDateString(),  sortable: true },
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

    const filteredCoupons = coupons.filter(
        (coupon) =>
            coupon.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSubmit = async (couponData, event) => {
        event.preventDefault(); // Prevent page refresh
        try {
            if (editMode && selectedCoupon) {
                const updatedCouponData = { ...couponData, id: selectedCoupon.id };
                const response = await request('PUT', `/api/company/updateCoupon`, updatedCouponData);
                setSuccessMessage('Coupon saved successfully!');
            } else {
                const response = await request('POST', '/api/company/addCoupon', couponData);
                setSuccessMessage('Coupon added successfully!');
            }
            fetchCoupons(); // Fetch updated data
        } catch (error) {
            console.error('Error adding/updating coupon:', error);
        }
    };

    return (
        <div>
           <MDBRow className="d-flex justify-content-end align-items-center">
              <MDBCol className="p-2">
                  <MDBInput
                      id ="search-coupon"
                      label="Search..."
                      onChange={(e) => setSearchText(e.target.value)}
                      type="text"
                  />
              </MDBCol>
              <MDBCol className="p-2">
                  <MDBBtn color="primary" onClick={toggleShow}>
                      <MDBIcon fas icon="plus" /> Add Coupon
                  </MDBBtn>
              </MDBCol>
           </MDBRow>
            <hr />

            <DataTable
                columns={columns}
                data={filteredCoupons}
                pagination
            />
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>New Coupon</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <hr />
                        <MDBModalBody>
                            <CompanyCouponsForm
                                handleSubmit={handleSubmit}
                                coupon={editMode ? selectedCoupon : {}}
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
        </div>
    );
};

export default CouponsDataTable;
