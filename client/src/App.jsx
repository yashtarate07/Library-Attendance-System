import Main from './components/Main/Main.jsx' 
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import StudentDashboard from './components/StudentDashboard/StudentDashboard.jsx';
import StudentAttendence from './components/StudentDashboard/StudentAttendence.jsx';
import StudentBooks from './components/StudentDashboard/StudentBooks.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';
import AdminAttendence from './components/AdminDashboard/AdminAttendence.jsx';
import AdminStudent from './components/AdminDashboard/AdminStudent.jsx';
import AdminAddBooks from './components/AdminDashboard/AdminAddBooks.jsx';
import AdminBooks from './components/AdminDashboard/AdminBooks.jsx';
import AdminBookDetails from './components/AdminDashboard/AdminBookDetails.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import  NewSubmit from './components/NewSubmit/NewSubmit.jsx'
import AdminDeleteBooks from './components/AdminDashboard/AdminDeleteBooks.jsx';
// import Header from "./components/Header.jsx";
// import Login from "./components/Login.jsx";
// import Register from "./components/Register.jsx";
// import Dashboard from "./components/Dashboard";
// import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'; 
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate instead of useNavigate
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Scannerr from './components/Scanner/Scannerr.jsx';
// import Admin from './components/Admin/Admin.jsx'
// import Layout from './components/pages/Layout/Layout.jsx';
// import DashBoard from '../src/components/Student/DashBoard.jsx'
// import AdminDash from '../src/components/Admin/AdminDash.jsx'
// import AdminStudent from '../src/components/Admin/AdminStudent.jsx'
// import AdminBooks from '../src/components/Admin/AdminBooks.jsx'
// import Signin from "./components/Signin.jsx";
function App() {
  const user = localStorage.getItem("token");
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      // Use Navigate instead of history("/dash")
      return <Navigate to="/dash" />;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
   
       {data ? (
        <>
          {/* <Header /> */}
          <Routes>
           <Route path="/" exact element={<Scannerr />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
      <Route path="/student" exact element={<StudentDashboard />} />
      <Route path="/student/attendence" exact element={<StudentAttendence />} />
      <Route path="/student/books" exact element={<StudentBooks />} />
      <Route path="/admin" exact element={<AdminDashboard />} />
      <Route path="/admin/attendence" exact element={<AdminAttendence />} />
      <Route path="/admin/student" exact element={<AdminStudent />} />
      <Route path="/admin/books" exact element={<AdminBooks />} />
      <Route path="/admin/bookdetails" exact element={<AdminBookDetails/>} />
      <Route path="/admin/addbooks" exact element={<AdminAddBooks />} />
      <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/otp" element={<NewSubmit />} />
          <Route path='admin/deleteuserbook' element={<AdminDeleteBooks />} />
			{/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
             {/* <Route path="/admin" element={<AdminDash />} />
            <Route path="/admin/students" element={<AdminStudent/>}/>
            <Route path="/admin/books" element={<AdminBooks/>}/>
            <Route path="/admin/attendence" element={<AdminStudent/>}/> 
             <Route path="/admin" element={<AdminDash/>} /> 
            <Route path="/" element={<Signin/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
             <Route path="/" element={<Layout />} /> */}
           </Routes>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}  
    </>
  );
}

export default App;
