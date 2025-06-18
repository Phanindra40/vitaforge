// src/components/Layout.jsx
import Header from './Header';
import Home from './Home';
import React from 'react';
import '../index.css'; // Ensure this is the correct path to your CSS file
const Layout = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default Layout;
