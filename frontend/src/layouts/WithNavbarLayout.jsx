// src/layouts/WithNavbarLayout.jsx
import React from 'react';
import Navbar from '../frontend/Dashboard/DashboardNavbar' ; 

const WithNavbarLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default WithNavbarLayout;
