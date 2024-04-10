import  { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import "./Scanner.css";
import Header from "../Header.jsx";
import beep from '../../assets/beep.mp3'
// All import links 


const Scannerr = () => {

  const navigate = useNavigate();
  const beepSound = new Audio(beep);
  // const beepSound = String.fromCharCode(7);

  // const playBeepSound = () => {
  //   console.log('Beep sound:', beepSound);
  // };
  // All useStates

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [scannedResult, setScannedResult] = useState("");

  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
// On Success of Qr
  const onScanSuccess = (result) => {
    console.log(result);
    setScannedResult(result?.data);
    handleSubmit(result?.data);
    beepSound.play();
  };
//  On fail of Qr 
  const onScanFail = (err) => {
    console.log(err);
  };


  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current
        .start()
        .then(() => console.log("QR Scanner started"))
        .catch((err) => console.log("Error starting QR Scanner:", err));
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);



  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    }
  }, []);


  //  on submit of  form call the handleSubmit function passing the code as a parameter to it
  const handleSubmit = (email) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
      "0" +
      currentDate.getMinutes()
    ).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;

    axios
      .post("http://localhost:4556/signinScanner", {
        email: email,
        loginDate: formattedDate,
        loginTime: formattedTime,
      })
      .then((res) => {
        console.log("ater scann i get this data ;;;;;;",res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 200) {
          console.log(
            "email:res.data.user.email from scanner----------",
            res.data.user.email
          );
          navigate("/student", { state: { email: res.data.user.email ,name:res.data.user.name , contact:res.data.user.contact , department:res.data.user.department , universityNo:res.data.user.universityNo } });

          
          localStorage.setItem('statusDate',res.data.user.statusDate)
           localStorage.setItem('userEmail', email);
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log("front errro catch at scanner=======", err);
      });
  };

  // return starts from here
  return (
    <>
      <Header />
      <div className="login_container" style={{ background: "#F2FEFF", height: "1000px" }}>
        <div className="login_form_container" style={{ position: "relative", top: "-230px" }}>
          <div className="left" style={{ height: "900px" }}>
            <form className="form_container" onSubmit={(e) => handleSubmit(e)}>
              {/* <h1>Login to Your Account</h1> <br /> */}
              {/* <h2>Login Using Scanner</h2> */}
              <br />
              <div className="qr-reader">
                <video ref={videoEl}></video>
                <div ref={qrBoxEl} className="qr-box">
                  <img src={QrFrame} alt="Qr Frame" width={256} height={256} className="qr-frame" />
                </div>
              </div>
              {error && <div className="error_msg">{error}</div>}
              <Link to='/'>
              <button type="submit" className="green_btn">
                Sign In
              </button>
              </Link>
              <p>OR</p>
              <p>
                Don't Have Scanner ?<Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
          <div className="right" style={{ height: "900px" }}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className="white_btn">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scannerr;
