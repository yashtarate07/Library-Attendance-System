import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";
import Signup from './Signup';
import Header from './Header';

const Register = () => {
   
   

    return (
        <>
           <div className="mainRegister" style={{height:'auto',background:'#F2FEFF'}}>
           <Header/>
            <Signup/>
           </div>
        </>
    );
};

export default Register;
