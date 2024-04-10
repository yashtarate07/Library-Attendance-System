import React ,{useState ,useEffect} from "react";
import "./StudentDashboard.css";
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import axios from 'axios'
import { Link, useLocation ,useNavigate  } from "react-router-dom";
const StudentBooks = () => {
  const userEmail = localStorage.getItem("userEmail");
  const location = useLocation();
  const userEmailFromUrl = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [qrcode, setQrcode] = useState("");
  const [logoutDate, setLogoutDate] = useState("");
  const [logoutTime, setLogoutTime] = useState("");

  // Fetching only the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4556/userdata?email=${userEmail}`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          const user = response.data.find((user) => user.email === userEmail);
          if (user) {
            setUserData(user);
            setQrcode(
              `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userEmail}`
            );
          } else {
            console.log("User data not found.");
          }
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userEmail]);



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
    <div className="container" >
      <div className="navigation">
        <ul style={{position:'relative',left:'-50px'}}>
          <li>
            <a href="#">
              <span className="icon">
              <IoBookSharp size={30} color='#2a2185' style={{position:'relative',top:'20px',left:'20px'}} />
              </span>
              <span className="title"><h1 style={{fontSize:'25px'}}>Student</h1></span>
            </a>
          </li>
          <li>
            <Link  to="/student">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/student/attendence' >
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to="/student/books">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
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
       <Link to='/' ><button onClick={handleLogout} style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'110px' ,textAlign:'center',top:'-2px', fontSize:'20px' ,color:'black',border:'none' }}>Logout</button></Link>
        <div>
    </div>
    
          
          
    {/* <Link to='/' ><button onClick={handleLogout} style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'-150px' ,textAlign:'center',top:'-7px', fontSize:'20px' ,color:'black' }}>Logout</button></Link> */}

        </div>

        <div className="cardBox" >
          
          
          <div className="card" style={{position:'relative' , left:'80%'}} >
            <div>
              <div className="numbers">{userData.loginTime}</div>
              <div className="cardName">In Time</div>
            </div>
            <div className="iconBx">
            
            </div>
          </div>
          <div className="card"style={{position:'relative' , left:'150%'}}>
            <div>
              <div className="numbers">{userData.logoutTime}</div>
              <div className="cardName">Out Time</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className="details">
         <h1 style={{fontSize:'25px',color:'rgba(113,99,186,255)',position:'relative',left:'-100px'}}>Book</h1>
        </div>

        <div style={{position:'relative', top:'-360px',width:'60%',left:'50px'}}>
        <table >
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Book Issued Date</th>
                        <th>Book Issued Time</th>
                        <th>Book Returned Date</th>
                        <th>Book Returned Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>{userData.title}</td>
                        <td>{userData.statusDate}</td>
                        <td>{userData.statusTime}</td>
                        <td>{userData.returnDate}</td>
                        <td>{userData.returnTime}</td>
                        <td>{userData.status}</td>
                    </tr>
                </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default StudentBooks;
