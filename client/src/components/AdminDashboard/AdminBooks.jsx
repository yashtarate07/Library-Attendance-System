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
const AdminBooks = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [studentEmail , setStudentEmail] = useState("");
  const [loginDate , setLloginDate] = useState("");
  const [loginTime , setLoginTime] = useState("");
  const [logoutDate , setLogoutDate] = useState("");
  const [logoutTime , setLogoutTime] = useState("");
const [userData , setUserData] = useState("")
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalStudents, settotalStudents] = useState(0);

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
  
  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get('http://localhost:4556/admin/books');
        if (Array.isArray(response.data)) {
            setBooks(response.data);
            setTotalBooks(response.data.length);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchbooks();
  }, []);
  


  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get('http://localhost:4556/userdata');
        settotalStudents(response.data.length)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchbooks();
  }, []);



  useEffect(() => {
    const fetchUserLoginData = async () => {
      try {
        const response = await axios.get("http://localhost:4556/send-logindata");
        setStudentEmail(response.data.email);
        setLloginDate(response.data.loginDate);
        setLoginTime(response.data.loginTime);
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };

    fetchUserLoginData();
  }, []);


  
// sending Logout Date and time to db 
const handleLogout = (e) => {
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

  axios
    .post("http://localhost:4556/logoutdatetime", {
      email: userEmail,
      logoutDate: formattedDate,
      logoutTime: formattedTime
    })
    .then((res) => {
      console.log(res.data);

      if (res.data.code === 500) {
        alert("front while sending logout data  User Not Found");
      }
      if (res.data.code === 404) {
        alert("front while sending logout data  Password is wrong");
      }
      if (res.data.code === 200) {
        console.log("Logout data send successfully")
        navigate("/"); 
        console.log("hello navigate")
        localStorage.setItem("TOKEN", res.data.token);
        localStorage.setItem("EMAIL", res.data.email);
      }
      else{
        console.log('else part')
        navigate("/"); 
      }
    })
    .catch((err) => {
      console.log("front while sending logout data=======", err);
    });
};


  return (
    <div className="container" >
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

        <div className="cardBox"style={{display:'flex',justifyContent:'space-between'}}>
          <div className="card" style={{width:'25%',marginLeft:'150px'}}>
            <div>
              <div className="numbers">{studcnt}</div>
              <div className="cardName">Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          <div className="card" style={{width:'25%',marginRight:'50px'}}>
            <div>
              <div className="numbers">{totalBooks}</div>
              <div className="cardName">Books</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
         
        </div>

        <div className="details" style={{width:'100%'}}>
          <div className="recentOrders">
            <div className="cardHeader">
              <h2 style={{fontSize:"25px",position:'relative',left:'-10%'}}>All Books</h2>
              <Link to="/admin/addbooks" className="btn" style={{background:"rgba(113, 99, 186, 255)",width:'8%',fontSize:"20px",position:'relative',left:'-18%'}}>
                Add Books
              </Link>
            </div>
         <br />
         <br />
            <div className="booktable" style={{ height: '300px', overflowY: 'scroll',width:"100%",position:'relative',left:'-15%',top:'-50px' }}>
            <table>
  <tr style={{color:'rgba(113, 99, 186, 255)'}}>
    <th>Title</th>
    <th>Author</th>
    <th>Country</th>
    <th>Language</th>
    <th>year</th>
  </tr>
  {books.map((book, index) => (
      <tr key={index}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.country}</td>
        <td>{book.language}</td>
        <td>{book.year}</td>
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

export default AdminBooks;
