import React, { useState ,useEffect } from 'react';
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import { html5QrcodeScanner } from 'html5-qrcode';
import { Scanner } from '@yudiel/react-qr-scanner';
import "./mix.css"

const Login = () => {
   const [scanResult , setScanResult] = useState(null);
    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();


    // useEffect(() => {
    //     const scanner = new html5QrcodeScanner('reader', {
    //         qrbox: {
    //             width: 250,
    //             height: 250,
    //         },
    //         fps: 5,
    //     });
    
    //     scanner.render(onSuccess, onError);
    
    //     function onSuccess(result) {
    //         scanner.clear();
    //         setScanResult(result);
    //     }
    
    //     function onError(error) {
    //         console.error('QR Scanner error:', error);
    //     }
    // }, []);

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault();
    
        const { email, password } = inpval;
    
        if (email === "") {
            toast.error("Email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Please enter a valid email address!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("Password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!", {
                position: "top-center"
            });
        } else {
            const data = await fetch("http://localhost:8009/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
    
            const res = await data.json();
            console.log(res);
    
            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dash");
                setInpval({ ...inpval, email: "", password: "" });
            } else {
                toast.error("Invalid credentials. Please try again!", {
                    position: "top-center"
                });
            }
        }
    };

    

    return (
        <>
        {/* QR Code login */}
        {/* <section>
               { scanResult
               ? <div>Success: <a href={"http://"+scanResult}>{scanResult}</a></div>
               :  <div id="reader"></div>
               }
        </section> */}


        <section>
            
        </section>


        {/* regular login */}
            <section className='main-form' style={{display:'flex',flexDirection:'row',position:'relative',top:'-500px'}}>


                {/* first */}
                <div className="form_data" style={{width:"35%"}}>
                <h1>hr</h1>
                {/* <Scanner
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
        /> */}
                </div>


               {/* second */}
                <div className="form_data" style={{width:"35%"}}>
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login