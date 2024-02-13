import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ConsultancyCard from './DocCard/ConsultancyCard';
import Footer from '../../components/Footer/Footer';


const BACKEND =import.meta.env.VITE_BACKEND

export const Consultancies = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const endpoint = 'user';

      fetch(`${BACKEND}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(true);
        setUserData(data.user);
        if (data.user.specialization) {
          setIsDoctor(true);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.log('User not logged in'); // Handle user not being logged in
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}get-doctors`);

        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error('Error fetching doctors:', response.status);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();

  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDoctors = doctors
    ? doctors.filter(
        (doctor) =>
          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // console.log(doctors);

  return (
    <div>
      <Header />
      <div>
        <input
          type="text"
          placeholder="Search by specialization"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredDoctors.length > 0 ? (
        <div>
          {filteredDoctors.map((doctor, index) => (
            <ConsultancyCard key={index} doctor={doctor} user={userData.firstName}/>
          ))}
        </div>
      ) : (
        <p>No matching doctors found.</p>
      )}
      <Footer />
    </div>
  );
};
