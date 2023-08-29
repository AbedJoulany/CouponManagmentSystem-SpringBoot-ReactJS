import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CompanyPage from "./pages/CompanyPage";
import CustomerPage from "./pages/CustomerPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import Navbar from "./components/Navbar";
import CartPage from "./components/cartPage/CartPage";
import CheckoutPage from "./components/checkoutPage/CheckoutPage";
import CustomerFeed from "./pages/CustomerFeed";
import CustomerCoupons from "./pages/CustomerCoupons";


function App() {
    return (
        <div className="app">
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/company" element={<CompanyPage />} />
                    <Route path="/customer" element={<CustomerPage />} />
                    <Route path="/feed" element={<CustomerFeed />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/my-coupons" element={<CustomerCoupons/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
