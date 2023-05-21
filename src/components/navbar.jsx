import React from 'react';
import logo from '../assets/logo.svg'
import styles from './componentStyle.css'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <img src= {logo} className="logo"/>
        <span style={{ fontSize: '30px' }} className="company-name">My Foodprint</span>
      </div>
    </nav>
  );
};

export default Navbar;