import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "./Login.css";
import Header from "../Header.jsx";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // All useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loginDate, setLoginDate] = useState('');
    const [loginTime, setLoginTime] = useState('');

    localStorage.setItem('userEmail', email);
    // Handle Submit to send login data and login date time and check user and save login date and time in DB
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
        const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
        setLoginDate(formattedDate);
        setLoginTime(formattedTime);
    
        axios.post('http://localhost:4556/signin', {
            email: email,
            password: password,
            role: role,
            loginDate: formattedDate,
            loginTime: formattedTime,
        }) 
        .then(res => {
            if (res.data.code === 500) {
                alert('User Not Found')
            } else if (res.data.code === 404) {
                alert('Password is wrong')
            } else if (res.data.code === 200) {
                navigate(`/${role.toLowerCase()}`);
                console.log("hello status Date^^^^^^^",res.data.user.statusDate)
                localStorage.setItem('statusDate',res.data.user.statusDate)
                localStorage.setItem('userEmail', email);
                localStorage.setItem('TOKEN', res.data.token);
                localStorage.setItem('EMAIL', email);
            }
        }).catch(err => {
            console.log("front error: ", err)
        });
    }




    // Return Starts from here
    return (
        <>
            <Header />
            <div className="login_container" style={{ background: "#F2FEFF" }}>
                <div className="login_form_container">
                    <div className="left">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <h4>Using Email and Password</h4>

                               {/* Select options */}
                            <select className="input" name="role" id="role" value={role} onChange={(e) => { setRole(e.target.value) }}>
                                <option selected>Select an option</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                            </select>

                            {/* Email Input */}
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                className="input"
                            />

                            {/* Password Input */}
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                className="input"
                            />

                            <button type="submit" className="green_btn">
                                Sign In
                            </button>

                            <Link style={{ color: "red" }} to={'/forget-pass'}> Forget Password </Link>

                            <p>OR</p>
                            <p>Login Using Scanner ? <Link to="/">Sign In</Link></p>
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
    );
};

export default Login;
