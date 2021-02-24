import React from 'react';
import NavBarUnAuth from '../NavBarUnAuth';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

const LayoutUnAuth = ({ children }) => (
  <React.Fragment>
    <NavBarUnAuth></NavBarUnAuth>
    <main className="site-content">
      {children}
    </main>
  </React.Fragment>
);

export default LayoutUnAuth;  