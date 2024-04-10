import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"
import { IoBookSharp } from "react-icons/io5";
import  {Link } from 'react-router-dom'
const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        history("/")
    }

    const goError = () => {
        history("/")
    }

    return (
        <>
            <header style={{ background:'white',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <nav >
                    
                <NavLink to="/" style={{background:'none',fontSize:'25px',fontFamily:'poppins',color:'rgba(113, 99, 186, 255)'}}><h1 ><span style={{position:'relative',top:'30px',left:'-30px',background:'rgba(113, 99, 186, 255)',color:'rgba(113, 99, 186, 255)'}}></span><IoBookSharp color=' rgba(113, 99, 186, 255)' style={{position:'relative',top:'10px',left:'-5px'}} />Library Attendence System</h1></NavLink>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "rgba(113, 99, 186, 255)", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "rgba(113, 99, 186, 255)" }} onClick={handleClick} />
                        }

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <Link to ='/'><MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem></Link>
                                </>
                            )
                        }

                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header