import React, {useState,useCallback} from 'react';
import Navbar from '../components/Navbar';
import {
    MDBCard, MDBCardBody,
    MDBContainer,
    MDBIcon,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from "mdb-react-ui-kit";
import CompanyCouponsForm from "../components/CompanyCouponsForm";
import {request} from "../api/axiosHelper";
import CouponsDataTable from "../components/CouponsDataTable";

const CompanyPage = () => {


    const [iconsActive, setIconsActive] = useState('generate-coupons');
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }
        setIconsActive(value);
    };

    const handleSubmit = async (formData, event) => {
        event.preventDefault(); // Prevent page refresh
        console.log(formData);
        try {
                const response = await request('POST', `/api/company/addCoupon`, formData);
                //setSuccessMessage('Customer saved successfully!');
            }
        catch (error) {
            console.error('Error adding/updating customer:', error);
        }
    };
    const search = useCallback((value) => {
        let [phrase, columns] = value.split(' in:').map((str) => str.trim());

        if (columns) {
            columns = columns.split(',').map((str) => str.toLowerCase().trim());
        }

        return {phrase, columns};
    }, []);

    return (
        <div>
            <MDBContainer  className="">
                <h1 className="h5 text-center py-5 mb-0">Coupon management</h1>
                <MDBCard>
                    <MDBCardBody>
                        <CouponsDataTable/>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default CompanyPage;
