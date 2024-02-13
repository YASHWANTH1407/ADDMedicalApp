
import React from "react";
import Card1 from "./cards2.2.png";
import Card2 from "./cards.3.3.png";
import Card3 from "./cards1.1.png";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="cards-container" id="car_d">
      <div className="card">
        <img className="card-image" src={Card1} alt="profile picture" />
        <h2 className="card-title">Health</h2>
        <p className="card-text">Access reliable and up-to-date health information to empower your wellness journey</p>
      </div>

      <div className="card">
        <img className="card-image" src={Card2} alt="profile picture" />
        <h2 className="card-title">Interaction</h2>
        <p className="card-text">User Friendly interaction with the doctors through consultataions and video calls</p>
      </div>

      <div className="card">
        <img className="card-image" src={Card3} alt="profile picture" />
        <h2 className="card-title">Healing</h2>
        <p className="card-text">Your body can heal itself.It just need a right doctor.Choose your best doctor from Chikithsa</p>
      </div>
    </div>
  );
};

export default Cards;
