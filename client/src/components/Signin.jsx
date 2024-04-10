import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";
import Login from './Login'
import Header from './Header';
const Signin = () => {
  return (
   <>
     <div className="mainRegister">
           <Header/>
           <div  style={{height:'auto',background:'red'}}>
           <Login/>
           </div>
           </div>
   </>
  )
}

export default Signin
