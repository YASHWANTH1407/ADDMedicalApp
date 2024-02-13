import React from 'react';
import './ConsultancyCard.css'; // Import your CSS file for styling
import io from 'socket.io-client'


const ConsultancyCard = ({ doctor ,user}) => {
  const { firstName,lastName, degree, specialization, experience, status } = doctor;

  
//WRITE UR LOGIC HERE
  const handleConsultationRequest = () => {
   
  };

  
  return (
    <div className="consultancy-card">
      <div className="doctor-info">
        <h2>{firstName} {lastName}</h2>
        <p>{degree}</p>
        <p>{specialization}</p>
        <p>Experience: {experience} years</p>
      </div>
     
      <div className={`availability ${status ? 'available' : 'unavailable'}`}>
        {status ? (
          <button className="consult-button" onClick={handleConsultationRequest}>Consult</button>
        ) : (
          'Not Available'
        )}
      </div>
    </div>
  );
};

export default ConsultancyCard;
