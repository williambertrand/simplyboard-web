import React from 'react';
import NavBar from '../NavBar';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <React.Fragment>
    <NavBar></NavBar>
    <div className="site-content">
      {/* TODO: Eventually menu should be injected here */}
      {children}
    </div>
  </React.Fragment>
);

export default LayoutDefault;  