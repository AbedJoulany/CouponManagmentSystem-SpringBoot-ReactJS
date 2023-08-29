import React from "react";
import { useState, useEffect } from 'react';

import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer,
} from 'mdb-react-ui-kit';
import CustomersDataTable from '../components/CustomersDataTable';
import CompaniesDataTable from "../components/CompaniesDataTable"; // Import your CustomersDataTable component
import Navbar from "../components/Navbar";

const AdminPage = () => {

    const [iconsActive, setIconsActive] = useState('customers');
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }
        setIconsActive(value);
    };
    return (
        <div>
            <MDBContainer className="py-5 h-100">
            {/* ... Other components and sections ... */}

            {/* Pills for switching between Customers and Companies */}
            <MDBTabs pills className="mb-3">
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleIconsClick('customers')} active={iconsActive === 'customers'}>
                        <MDBIcon fas icon='users' className='me-2' /> Customers
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleIconsClick('companies')} active={iconsActive === 'companies'}>
                        <MDBIcon fas icon='building' className='me-2' /> Companies
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            {/* Content based on Pills selection */}
            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'customers'}>
                    <CustomersDataTable />
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === 'companies'}>
                    <CompaniesDataTable />
                </MDBTabsPane>
            </MDBTabsContent>
            </MDBContainer>
        </div>
    );
};

export default AdminPage;