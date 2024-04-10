import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminAddBooks = () => {
  const [studentEmail , setStudentEmail] = useState("");
  const [loginDate , setLloginDate] = useState("");
  const [loginTime , setLoginTime] = useState("");
  const [logoutDate , setLogoutDate] = useState("");
  const [logoutTime , setLogoutTime] = useState("");

  const [books, setBooks] = useState([]);
  const [userData , setUserData] = useState([])
  const [totalBooks, setTotalBooks] = useState(0);
const [todaysBooks , setTodaysBooks] = useState(0)
const [studcnt, setStudcnt] = useState(0);
const [todayStud, setTodayStud] = useState(0);           

//   data add t0 obackend
const [title , setTitle] = useState("");
	const [author , setAuthor] = useState("");
	const [country , setCountry] = useState("");
	const [language , setLanguage] = useState("");
	const [year , setYear] = useState("");
	;

    const navigate = useNavigate();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;

	const handleSubmit = async (e) => {
		e.preventDefault();
        axios.post('http://localhost:4556/admin/addbooks',
            {
				title:title,
				author:author,
				country:country,
				language:language,
        year: year
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
					navigate('/admin/books')
                    alert('Book added successfuly')
                } else {
                    alert('Error.')
                }
            }).catch(err => {
                console.log(err)
            })
	};


  
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
        setBooks(response.data);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  fetchBooks();
  }, []);

  return (
    
    <div className="container" style={{height:'400px'}}>
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <IoBookSharp
                  size={30}
                  color="#2a2185"
                  style={{ position: "relative", top: "17px", left: "30px" }}
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
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>
          <div
            className="flex-none"
            style={{ position: "absolute", left: "77%" }}
          >
            
          </div>
          <Link to='/' ><button style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'-200px' ,textAlign:'center',top:'-7px', fontSize:'20px' ,color:'black' }}>Logout</button></Link>
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
              <h2>All Books</h2>
              <a href="#" className="btn" style={{background:"rgba(113, 99, 186, 255)"}}>
                Add Books
              </a>
            </div>
         <br />
         <br />


           <div style={{position:'relative',top:'-60px'}}>
						<form className="form_container" onSubmit={handleSubmit}>
							
							{/* // name */}
							<input
								type="text"
								placeholder=" title"
								name="title"
								onChange={(e)=>{
								setTitle(e.target.value)
								}}
								value={title}
								required
								className="input"
							/>
							{/* University No */}
							<input
								type="text"
								placeholder="author"
								name="author"
								onChange={(e)=>{setAuthor(e.target.value)}}
								value={author}
								required
								className="input"
							/>
							{/* department */}
							<input
								type="text"
								placeholder="country"
								name="country"
								onChange={(e)=>{setCountry(e.target.value)}}
								value={country}
								required
								className="input"
							/>
							{/* contact no */}
							<input
								type="text"
								placeholder="Language"
								name="language"
								onChange={(e)=>{setLanguage(e.target.value)}}
								value={language}
								required
								className="input"
							/>
							{/* email */}
							<input
								type="text"
								placeholder="Year"
								name="Year"
								onChange={(e)=>{setYear(e.target.value)}}
								value={year}
								required
								className="input"
							/>

							<button type="submit" className="btn">
								Add New Book
							</button>
						</form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminAddBooks;