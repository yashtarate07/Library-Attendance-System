import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reminder from "../../assets/reminder.mp3";

const StudentDashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userStatusDate = localStorage.getItem("statusDate");
  const [showReminder, setShowReminder] = useState(false);
  const location = useLocation();
  const userEmailFromUrl = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [qrcode, setQrcode] = useState("");
  const [logoutDate, setLogoutDate] = useState("");
  const [logoutTime, setLogoutTime] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4556/userdata`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const user = response.data.find((user) => user.email === userEmail);
          if (user) {
            setUserData(user);
            setQrcode(
              `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userEmail}`
            );
            const issuedDate = new Date(userStatusDate);
            const currentDate = new Date();
            const todaysDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            );
            const diffTime = Math.abs(todaysDate - issuedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log("Helloo diff day%%%%%%%%%", diffDays);
            if (diffDays > 5) {
              setShowReminder(true);
              const audio = new Audio(reminder);
              audio.play();
              toast.error("You have books issued for more than 5 days!");
            }
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

  const handleDownload = async () => {
    try {
      const response = await axios({
        url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userEmail}`,
        method: "GET",
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userData.name}.png`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
      "0" + currentDate.getMinutes()
    ).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
    setLogoutDate(formattedDate);
    setLogoutTime(formattedTime);
    const email = userEmail || userEmailFromUrl;

    try {
      const response = await axios.post(
        "http://localhost:4556/logoutdatetime",
        {
          email: email,
          logoutDate: formattedDate,
          logoutTime: formattedTime,
        }
      );
      console.log("Logout Response:", response.data);
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
      <ToastContainer />
      <div className="navigation">
        <ul style={{ position: "relative", left: "-50px" }}>
          <li>
            <Link to="/">
              <span className="icon">
                <IoBookSharp
                  size={30}
                  color="#2a2185"
                  style={{ position: "relative", top: "20px", left: "20px" }}
                />
              </span>
              <span className="title">
                <h1 style={{ fontSize: "25px" }}>Student </h1>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/student?email=${userEmailFromUrl}`}>
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={`/student/attendence?email=${userEmailFromUrl}`}>
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Attendance</span>
            </Link>
          </li>
          <li>
            <Link to={`/student/books?email=${userEmailFromUrl}`}>
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
          <div className="search" style={{ position: "relative", left: "40%" }}>
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
            <Link to='/'>
              <button onClick={handleLogout}style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'140%' ,textAlign:'center',top:'-47px', fontSize:'20px' ,color:'black',border:'none' }}>Logout</button>
            </Link>
          </div>

          {/* <HiMiniBellAlert
            size={30}
            color="rgba(113, 99, 186, 255)"
            style={{ position: "relative", left: "19%" }}
            onMouseEnter={() => setShowReminder(true)}
            onMouseLeave={() => setShowReminder(false)}
          /> */}
          

          
        </div>

        <div className="cardBox">
          <div className="card" style={{ position: "relative", left: "80%" }}>
            <div>
              <div className="numbers">{userData.loginTime || 0}</div>
              <div className="cardName">In Time</div>
            </div>
            <div className="iconBx"></div>
          </div>
          <div
            className="card"
            style={{ position: "relative", left: "150%" }}
          >
            <div>
              <div className="numbers">{userData.logoutTime || 0}</div>
              <div className="cardName">Out Time</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>
        <br />

        <div className="details">
          <div
            className="recentOrders"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="leftOne">
              <h2
                style={{
                  fontSize: "23px",
                  color: "rgba(113, 99, 186, 255)",
                  position: "relative",
                  top: "-20px",
                }}
              >
                Student Details
              </h2>
              <br />
              <div
                className="stu_img"
                style={{
                  height: "200px",
                  width: "200px",
                  position: "relative",
                  top: "-20px",
                  boxShadow: "0 7px 25px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* student image */}
                <img src={qrcode} alt="" />
              </div>
              <button
                onClick={handleDownload}
                style={{
                  background: "rgba(113, 99, 186, 255)",
                  width: "150px",
                  height: "40px",
                  borderRadius: "10px",
                  position: "relative",
                  left: "12%",
                  textAlign: "center",
                  top: "20px",
                  fontSize: "20px",
                  color: "black",
                  border: "none",
                }}
              >
                Download QR
              </button>
            </div>

            <div
              className="rightOne"
              style={{
                position: "relative",
                left: "30%",
                fontSize: "18px",
              }}
            >
              <div
                className="topOne"
                style={{
                  textAlign: "left",
                  width: "220%",
                  position: "relative",
                  left: "-30%",
                  top: "70px",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td style={{ textAlign: "center" }}>
                        {userData.name}
                      </td>
                    </tr>
                    <tr>
                      <td>Department:</td>
                      <td style={{ textAlign: "center" }}>
                        {userData.department}
                      </td>
                    </tr>
                    <tr>
                      <td>University No:</td>
                      <td style={{ textAlign: "center" }}>
                        {userData.universityNo}
                      </td>
                    </tr>
                    <tr>
                      <td>Contact No:</td>
                      <td style={{ textAlign: "center" }}>
                        {userData.contact}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bottumOne" style={{ position: "relative", top: "90px" }}>
                <Link to="/student/attendence">
                  <button className="attendence_btn" style={{ position: "relative", left: "8%", top: "30px" }}>Attendance</button>
                </Link>
                <Link to="/student/books">
                  <button className="books_btn" style={{ position: "relative", left: "40%", top: "30px" }}>Books</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
