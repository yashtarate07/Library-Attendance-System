import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Link , useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'
const AdminAttendence = () => {
const location = useLocation();
const navigate = useNavigate()
const userEmail = localStorage.getItem("userEmail");
 const [logoutDate , setLogoutDate] = useState("");
 const [logoutTime , setLogoutTime] = useState("")

 const [email, setEmail] = useState("");
 
 const [userData, setUserData] = useState([]);

  const [bookdetails , setBookdetails] = useState({})

  const [totalBooks, setTotalBooks] = useState(0);
  const [todaysBooks , setTodaysBooks] = useState(0)
  const [studcnt, setStudcnt] = useState(0);
  const [todayStud, setTodayStud] = useState(0);
  
  // Todays Currunt date and time 
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
  
  
  // Fetching all users data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4556/userdata");
        setUserData(response.data);
        console.log("response data ",userData)
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };
    fetchUserData();
  }, []);
  
  // Apply conditions to get only students data 
  useEffect(() => {
  if (!userData || userData.length === 0) {
    console.log("User data is null or empty.");
    return;
  }
  const studentCount = userData.filter((user) => user.role === 'Student').length;
  setStudcnt(studentCount);
  
  const todaysCount = userData.filter((user) => user.loginDate === formattedDate).length;
  setTodayStud(todaysCount);
  
  // total todays issued books count
  const todaysIssuedBooksCount = userData.filter((user) => user.statusDate === formattedDate).length;
  setTodaysBooks(todaysIssuedBooksCount);
  console.log("hrhrhrhrh",totalBooks)
  }, [userData, formattedDate]);
  
  
  // TOTAL BOOKS
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4556/admin/books");
      if (Array.isArray(response.data)) {
        setTotalBooks(response.data.length);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  fetchBooks();
  }, []);
  
  
    
  // send logout Date and time to backend
  const sendLogoutDateTime = async () => {
    try {
        const response = await axios.post('http://localhost:4556/logoutdatetime', {
            email,
            logoutDate,
            logoutTime
        });
        console.log(response.data);
        // Handle response as needed
    } catch (error) {
        console.error('Error sending logout date and time:', error);
    }
};

// Call sendLogoutDateTime function when needed, such as on logout button click


const handleLogout = async (e) => {
  e.preventDefault();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    "0" + (currentDate.getMonth() + 1)
  ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
    "0" + currentDate.getMinutes()
  ).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
  setLogoutDate(formattedDate);
  setLogoutTime(formattedTime);
  const email = userEmail || userEmailFromUrl;

  try {
    const response = await axios.post("http://localhost:4556/logoutdatetime", {
      email: email,
      logoutDate: formattedDate,
      logoutTime: formattedTime,
    });
    console.log("Logout Response:", response.data); // Log the response data

    if (response.data.code === 200) {
      navigate("/");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("EMAIL");
    } else {
      console.log("Logout failed: Unexpected response code");
      navigate("/");
    }
  } catch (err) {
    console.log("Error sending logout data", err);
    console.log("Logout failed: Request error");
    navigate("/");
  }
};


  return (
    <div className="container">
      <div className="navigation">
        <ul style={{position:'relative',left:'-50px'}}>
          <li>
            <a href="#">
              <span className="icon">
                <IoBookSharp
                  size={30}
                  color="#2a2185"
                  style={{ position: "relative", top: "17px", left: "20px" }}
                />
              </span>
              <span className="title">
                <h1 style={{ fontSize: "25px" }}>Admin</h1>
              </span>
            </a>
          </li>
          <li>
           < Link to="/admin">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/student">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Students</span>
            </Link>
          </li>
          <li>
            <Link  to="/admin/attendence">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/books">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Books</span>
            </Link>
          </li>
          
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          
          <div className="search" style={{position:'relative',left:'40%'}}>
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

        {/* <HiMiniBellAlert  size={30} color="rgba(113, 99, 186, 255)" style={{position:'relative',left:'19%'}}/> */}
       <Link to='/' ><button onClick={handleLogout} style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'180%' ,textAlign:'center',top:'-2px', fontSize:'20px' ,color:'black',border:'none' }}>Logout</button></Link>
        <div>
         
        </div>
          
    

        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">{studcnt}</div>
              <div className="cardName">Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{totalBooks}</div>
              <div className="cardName">Books</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{todaysBooks}</div>
              <div className="cardName">Today Issued Books </div>
            </div>
            <div className="iconBx"></div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{todayStud}</div>
              <div className="cardName">Todays Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className="details" style={{width:'100%'}}>
          <div className="recentOrders">
            <div className="cardHeader">
              <h2 style={{fontSize:'25px',paddingRight:"-20px"}}>Attendence</h2>
              
            </div>
         <br />
         <br />
            <div className="booktable" style={{ height: '300px', overflowY: 'scroll',width:"100%",position:'relative',left:'-10%',top:'-60px' }}>
            <table>
  <tr style={{color:'rgba(113, 99, 186, 255)'}}>
    <th>Name</th>
    <th>Contact</th>
    <th>loginDate</th>
    <th>loginTime</th>
    <th>logoutDate</th>
    <th>logoutTime</th>
  </tr>
  {userData.map((book, index) => (
      <tr key={index}>
        <td>{book.name}</td>
        <td>{book.contact}</td>
        <td>{book.loginDate}</td>
        <td>{book.loginTime}</td>
        <td>{book.logoutDate}</td>
        <td>{book.logoutTime}</td>
      </tr>
    ))}
  
</table>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default AdminAttendence;
