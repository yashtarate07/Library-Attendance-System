import { useState } from "react"
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./ForgetPassword.css";
import Header from "../Header.jsx";
import { Link, useNavigate } from "react-router-dom";
function ForgetPassword() {

    const navigate = useNavigate()
    const [mobile, setMobile] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ffrontend",email)
        axios.post('http://localhost:4556/send-otp',
            {
                email: email
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/otp')
                } else {
                    alert('Email / Server Error.')
                }
            }).catch(err => {
                console.log(err)
            })  
    }

    return (<>
    <Header/>
    <div className="login_container" style={{ background: "#F2FEFF" }}>
                <div className="login_form_container">
                    <div className="left">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Forget Password</h1>
                            <input
                                type="text"
                                placeholder="Enter Your Mobile Number"
                                name="mobile"
                                value={mobile}
                                onChange={(e)=>{setMobile(e.target.value)}}
                                required
                                className="input"
                            />
                          
                           
                            
                            <button
                onClick={handleSubmit}
                className="green_btn">
                SEND OTP </button>

                            
                        </form>
                    </div>
                    <div className="right">
                        <h1>New Here ?</h1>
                        <Link to="/signup">
                            <button type="button" className="white_btn">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Place ToastContainer outside main content */}
        </>
    );
    
}

export default ForgetPassword