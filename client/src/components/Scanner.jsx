import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const Scanner = ({ onScannedData }) => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = (result) => {
    console.log("Scanned Result at scanner:", result);
    setScannedResult(result?.data); // Set the scanned data in state
    onScannedData(result?.data); // Pass the scanned data to the parent component
  };

  useEffect(()=>{
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email, password)
          axios.post('http://localhost:7000/signup',
              {
                  email: scannedResult
              })
              .then(res => {
                  console.log(res.data)
                  if (res.data.code === 500) {
                    alert('User Not Found')
                }
                if (res.data.code === 404) {
                    alert('Password is wrong')
                }
                if (res.data.code === 200) {
                    // move to home
                    if(role ==="Student"){
                        navigate('/student');
                    }
                    else if(role ==='Admin'){
                        navigate('/admin');
                    }
                    else{
                        alert("User not found")
                    }
                    localStorage.setItem('TOKEN', res.data.token)
                    localStorage.setItem('EMAIL', res.data.email)
                  }
              }).catch(err => {
                  console.log(err)
              })
    };
    
  },[scannedResult])
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
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl.current) {
        scanner.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    }
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <video ref={videoEl} style={{ height: '400px' }}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default Scanner;
