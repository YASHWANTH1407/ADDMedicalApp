import React from "react";
import "./Offer.css";

const Offer = () => {
  return (
    <div className="image-container2" id="off">
      <img src="./knee.png" alt="houses" />
      
      <img src="./Doctor3.png" alt="doctor" />
      <div className="offer">
        <h1>What we offer</h1>
        <p>
          Experience the future of healthcare with our platform. Connect
          seamlessly with specialized doctors through video consultations,
          ensuring personalized and efficient care. Receive your prescriptions
          instantly as QR codes, revolutionizing the way you access and manage
          your medications."
        </p>
      </div>
    </div>
  );
};

export default Offer;
