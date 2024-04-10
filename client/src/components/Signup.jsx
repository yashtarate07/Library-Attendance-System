import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"; 
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
const Signup = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const [dataList , setDataList] = useState("")
    const [qrimg, setQrimg] = useState("");
    const [inpval, setInpval] = useState({
        fname: "",
        department:"",
        unviversityno:"",
        contactno:"",
        email: "",
        password: "",
        cpassword: "",
        picture: "",
        selectyourself:""
    });
    const options = ['Student','Admin'];
    const [dataqr, setDataqr] = useState("");
    
    const handleSelectChange = (e) => {
        setInpval(prevState => ({
            ...prevState,
            selectyourself: e.target.value
        }));
        console.log(inpval.selectyourself);
    };


    useEffect(() => {
        setDataqr(inpval.email);
    }, [inpval.email]);

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendEmail = async (qrImgUrl) => {
        try {
            const response = await fetch("http://localhost:8009/sendemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: inpval.email,
                    qrImgUrl,
                    note: "Here is your QR code for registration"
                })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname,department,unviversityno,contactno, email, password, cpassword, picture,selectyourself } = inpval;

        if (!fname || !email || !password || !cpassword || !picture ||! department || !contactno ||!selectyourself) {
            toast.error("Please provide all required fields!", { position: "top-center" });
            return;
        }

        if (!email.includes("@")) {
            toast.warning("Please enter a valid email address!", { position: "top-center" });
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!", { position: "top-center" });
            return;
        }

        if (password !== cpassword) {
            toast.error("Password and Confirm Password do not match!", { position: "top-center" });
            return;
        }

        try {
            const data = await fetch("http://localhost:8009/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname,department,unviversityno,contactno, email, password, cpassword, picture,selectyourself
                })
            });

            const res = await data.json();
            console.log(res.status);

            if (res.status === 201) {
                toast.success("Registration Successfully done 😃!", { position: "top-center" });
                setInpval({ fname: "", email: "", password: "", cpassword: "", picture: "", selecttt: "",department:"",unviversityno:"",contactno:"" ,selectyourself:""});
                const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?=250x250&data=${dataqr}`;
                setQrimg(qrImgUrl);
                sendEmail(qrImgUrl);
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    
  return (
    <div>
       <section>
                <div className="form_data" style={{background:'white',}}>
                    <div className="form_heading">
                        <h1 style={{color:'rgba(113, 99, 186, 255)'}}>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>
                       <img src={qrimg} alt="" />
                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="department">Department</label>
                            <input type="text" onChange={setVal} value={inpval.department} name="department" id="department" placeholder='Enter Your Department' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="unviversityno">University No</label>
                            <input type="text" onChange={setVal} value={inpval.unviversityno} name="unviversityno" id="unviversityno" placeholder='Enter Your University No' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="contactno">Contact No</label>
                            <input type="text" onChange={setVal} value={inpval.contactno} name="contactno" id="contactno" placeholder='Enter Your Contact No' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ?  <BiSolidHide size={25}/>:<BiSolidShow size={25}/> }
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? <BiSolidHide size={25}/>:<BiSolidShow size={25}/>}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="picture">Profile Picture</label>
                            <input type="file" onChange={setVal} value={inpval.picture} name="picture" id="picture" placeholder='Enter Your picture' />
                        </div>

                        <div>
                        <label htmlFor="picture">Select Yourself</label>
                        <br />
      <select value={selectedOption} onChange={handleSelectChange} style={{background:'white',width:'100%',height:'45px',border:'1px solid gray'}}>
        <option value="">Select...</option>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>
      <br />
      <p>dfasfk;fdjfdsf;fdsksdofjalfafo;{inpval.selectyourself}</p>
      
    </div>

                        <button className='btn' onClick={addUserdata} style={{background:'rgba(113, 99, 186, 255)'}}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/" style={{color:'rgba(113, 99, 186, 255)'}}>Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
    </div>
  )
}

export default Signup
