import { useState } from "react"
import axios from 'axios'
import {Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import './NewSubmit.css'
import Header from "../Header.jsx";
function NewSubmit() {

    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(otp, password)
        axios.post('http://localhost:4556/submit-otp',
            {
                otp: otp,
                password: password,
            })
            .then(res => {
                console.log("Hello otp",res.data)
                if (res.data.code === 200) {
                    navigate('/signin')
                    alert('Password Updated.')
                } else {
                    alert('server err / wrong OTP')
                }
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
        <Header />
        <div className="login_container" style={{ background: "#F2FEFF" }}>
                <div className="login_form_container">
                    <div className="left">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Enter New Password</h1>
                            

                            <input
                                type="text"
                                placeholder="OTP"
                                name="otp"
                                value={otp}
                                onChange={(e)=>{setOtp(e.target.value)}}
                                required
                                className="input"
                            />

                            
                            <input
                                type="password"
                                placeholder="New Password"
                                name="password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                required
                                className="input"
                            />
                           
                           
                            <button
                    onClick={handleSubmit}
                    className="green_btn"> CHANGE PASSWORD </button>

                           
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
            <ToastContainer /> 
        </>
    )
}

export default NewSubmit