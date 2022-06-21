import React, { useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  let videoRef = useRef(null);
  let photo = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let videos = videoRef.current;

        videos.srcObject = stream;

        videos.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  const snapShot = () => {
    let width = 500;
    let height = width / (16 / 9);

    let photos = photo.current;
    let video = videoRef.current;

    photos.width = width;

    photos.height = height;

    let current = photos.getContext("2d");

    current.drawImage(video, 0, 0, photos.width, photos.height);
  };

  const clearImage = ( ) =>{
    let photos = photo.current

    let current = photos.getContext('2d')

    current.clearRect(0,0,photos.width,photos.height)
  }

  return (
    <div>
      <h1>Selfi Camera</h1>
      <div className="container">
        <div className="video">
        <video ref={videoRef}></video>

        </div>

        <button onClick={snapShot} className="button">
        Capture
      </button>
          
          <div className="box">
          <canvas className="snap" ref={photo}></canvas>
          <button className="clear" onClick={clearImage}>Clear Image</button>
        </div> 
        
        
       
      </div>
    
     


    </div>
  );
};

export default App;
