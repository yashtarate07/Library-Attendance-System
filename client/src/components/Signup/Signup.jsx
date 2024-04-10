import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import styles from "./Signup.module.css";
import Header from "../Header";
// all import links 

const Signup = () => {
	// useNAvigate
	const navigate = useNavigate();

	// all useState Variables
	const [name , setName] = useState("");
	const [universityNo , setUniversityNo] = useState("");
	const [department , setDepartment] = useState("");
	const [contact , setContact] = useState("");
	const [email , setEmail] = useState("");
	const [password , setPassword] = useState("");
	const [role , setRole] = useState("");
	const [picture , setPicture] = useState("");
    const [Qrimg ,setQrimg] =useState("");

    // On Submit Send data to backend
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === "") {
            toast.warning("fname is required!", { position: "top-center" });
        } else if (email === "") {
            toast.error("email is required!", { position: "top-center" });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", { position: "top-center" });
        } else if (password === "") {
            toast.error("password is required!", { position: "top-center" });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", { position: "top-center" });
        
        } else {
			console.log(email, password)
        axios.post('http://localhost:4556/signup',
            {
				name:name,
				universityNo:universityNo,
				department:department,
				contact:contact,
                email: email,
                password: password,
				role:role,
				picture:picture
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
					toast.success("Registration Successfully done 😃!", { position: "top-center" });
					const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?=250x250&data=${email}`;
					setQrimg(`data:image/png;base64,${res.data.qrCode}`);
					if(role ==="Student"){navigate('/login')}
					else if(role ==="Admin"){navigate('/login')}
					else{alert("Please choose correct yourself")}
                    
                } else {
                    alert('Error.')
                }
            }).catch(err => {
                console.log(err)
            })
		}
		
	};
	
	return (
		<>
			<Header />
			<div className={styles.signup_container}>
				<div className={styles.signup_form_container}>
					<div className={styles.left}>
						<h1>Welcome Back</h1>
						<Link to="/">
							<button type="button" className={styles.white_btn}>
								Sign in
							</button>
							<img src={{Qrimg}} alt="" />
						</Link>
					</div>
					<div className={styles.right}>
						<form className={styles.form_container} onSubmit={handleSubmit}>
							<h1>Create Account</h1>
							{/* // name */}
							<input
								type="text"
								placeholder=" Name"
								name="name"
								onChange={(e)=>{
								setName(e.target.value)
								}}
								value={name}
								required
								className={styles.input}
							/>
							{/* University No */}
							<input
								type="text"
								placeholder="University Number"
								name="universityNo"
								onChange={(e)=>{setUniversityNo(e.target.value)}}
								value={universityNo}
								required
								className={styles.input}
							/>
							{/* department */}
							<input
								type="text"
								placeholder="Department"
								name="department"
								onChange={(e)=>{setDepartment(e.target.value)}}
								value={department}
								required
								className={styles.input}
							/>
							{/* contact no */}
							<input
								type="text"
								placeholder="Contact Number"
								name="contact"
								onChange={(e)=>{setContact(e.target.value)}}
								value={contact}
								required
								className={styles.input}
							/>
							{/* email */}
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={(e)=>{setEmail(e.target.value)}}
								value={email}
								required
								className={styles.input}
							/>
							{/* password */}
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={(e)=>{setPassword(e.target.value)}}
								value={password}
								required
								className={styles.input}
							/>

							{/* select role */}
							<select required className={styles.input} name="selectRole"value={role} onChange={(e)=>{setRole(e.target.value)}}>
							<option>Select an option</option>
								<option value="Student">Student</option>
								<option value="Admin">Admin</option>
							</select>
{/* 							
							<input
								type="file"
								placeholder="Profile picture"
								name="picture"
								onChange={(e)=>{setPicture(e.target.value)}}
								value={picture}
								required
								className={styles.input}
							/> */}
							
							<button type="submit" className={styles.green_btn}>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer /> {/* Place ToastContainer outside main content */}
		</>
	);
};

export default Signup;