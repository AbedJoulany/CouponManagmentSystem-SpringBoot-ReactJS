import React, {useEffect, useState} from "react";
import {MDBBtn, MDBCol, MDBInput, MDBInputGroup, MDBRow, MDBTextArea} from "mdb-react-ui-kit";

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import './datePicker/style.css';
import * as dateFns from "date-fns";

const CompanyCouponsForm = ({ handleSubmit,coupon = {} }) => {
    const [category, setCategory] = useState('Food'); // Default category
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [dateRange, setDateRange] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            category: category,
            title: title,
            description: description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            amount: amount,
            price: price,
            image: imageUrl,
        };
        handleSubmit(formData, e);
    };
    useEffect(() => {
        if (coupon) {
            setTitle(coupon.title );
            setDescription(coupon.description);
            setStartDate(coupon.startDate );
            setEndDate(coupon.endDate );
            setAmount(coupon.amount );
            setPrice(coupon.price );
            setImageUrl(coupon.image );
        }
        if (coupon.startDate && coupon.endDate) {
            const startDate = new Date(coupon.startDate);
            const endDate = new Date(coupon.endDate);
            setDateRange([startDate, endDate]);
        } else {
            setDateRange([]);
        }
    }, [coupon]);
    const handleDateChange = (value) => {
        setDateRange(value)
        if(value === null)
        {
            setStartDate(null);
            setEndDate(null)
        }else {
            setStartDate(value[0]);
            setEndDate(value[1])
        }
    };
    const disabledDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        return date < today;
    };

    return (
        <form onSubmit={handleFormSubmit} id="generate-coupon-form">

            <MDBInput className='mb-3'
                      id='coupon-title'
                      label='Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
            />
            <MDBTextArea  wrapperClass='mb-3'
                          textarea="true"
                          id='coupon-description'
                          rows={4} label='Description'
                          onChange={(e) => setDescription(e.target.value)}
                          value ={description}
            />
            <MDBRow className='mb-3'>
                <MDBCol>
                    <MDBInputGroup  textBefore='$' textAfter='.00'>
                        <input id='coupon-price' className='form-control' type='text'
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                        />
                    </MDBInputGroup>
                </MDBCol>
                <MDBCol>
                    <MDBInput
                              id='coupon-amount'
                              label='Amount'
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mb-3'>
                <MDBCol>
                    <select className='form-select ' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Food">Food</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Vacation">Vacation</option>
                    </select>
                </MDBCol>
                <MDBCol>
                    <div>
                        <DateRangePicker block value={dateRange}
                                         onChange={handleDateChange}
                                         shouldDisableDate={disabledDate}>
                            style={{ zIndex: 9999 }}
                        </DateRangePicker>
                    </div>
                </MDBCol>
            </MDBRow>
            <label htmlFor='image-url' className='form-label'>
                Coupon Image URL
            </label>
            <MDBInputGroup className='mb-3' noBorder >
                <input className='form-control rounded' id='image-url' type='text'
                       value={imageUrl}
                       onChange={(e) => setImageUrl(e.target.value)}
                />
            </MDBInputGroup>
            <MDBBtn type="submit">Save</MDBBtn>
        </form>
    );
};

export default CompanyCouponsForm;
