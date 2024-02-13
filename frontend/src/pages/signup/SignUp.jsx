import React, { useState, useEffect } from "react";
import "./SignUp.css";
const SignUpRoute = import.meta.env.VITE_BACKEND


export default function SignUp() {
  
  // State to manage the form data

  const[isCreated,setIsCreated]=useState(false)
  const[used,setUsed]=useState(false)
  const[fillDetails,setFillDetails]=useState(false)
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    age:'',
    phNo: "",
    email: "",
    pwd: "",
    
  });
  
  async function sendDataToServer() {
    try {
      // Make a POST request to the server endpoint
      const response = await fetch(`${SignUpRoute}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the server response is successful
      if (response.ok) {
        console.log("Signup successful");
        // // Reset the form data after successful signup
        setFormData({
          fn: "",
          ln: "",
          phNo: "",
          age:'',
          email: "",
          pwd: "",
          
        });
        setIsCreated(true)

      } else {
        console.log("SignUp failed");
        setUsed(true)
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  }

  // Event handler to update the form data when input/select values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for the signup button click
  const handleSignUpClick = () => {
    // Check if form data is not empty before sending to the server
    if (
      formData.fn &&
      formData.ln &&
      formData.phNo &&
      formData.email &&
      formData.pwd && 
      formData.age
    ) {
      sendDataToServer(); // Call the function to send data to the server
    } else {
      console.log("Please fill in all fields.");
      /*setInterval(()=>*/setFillDetails(true),5000/*)*/
    
    }
  };

  const handleSelectChange = (e) => {
    setOption(e.target.value);
      const selectedOption = e.target.value;

    // Check the selected option and redirect accordingly
    if (selectedOption === 'doctor') {
      setDr("dr")
        
    } else if (selectedOption === 'patent') {
      setDr("pt")
        
    }
  };


  // JSX for the component's UI
  return (
    
    <div className="container">
      {used?<div className="why--container">
        <h4>failed to create an account (here's why) </h4>
        <ul>
          <li>The email or phone number is already used</li>
          <li>length of password must be atleast 8 characters</li>
        </ul>
      </div>:null}
        
      {isCreated ? <div className="why--container"><p><strong>User created</strong></p></div>:null}
    {fillDetails ? <div className="why--container"><p><strong>Please fill in all fields.</strong></p></div>:null}
    

      <div className="form-box">
         {/* <img src={logo} className="chikitsa-logo"/> */}
        <h1 id="title">Sign Up</h1>
        <form>
          <div className="input-group">
            {/* Input fields for first name, last name, phone number, email, and role */}
            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="First Name"
                name="fn"
                value={formData.fn}
                onChange={handleInputChange}
              />
            </div>
            {/* Repeat similar pattern for other input fields */}
            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Last Name"
                name="ln"
                value={formData.ln}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            

            <div className="input-field">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phNo"
                value={formData.phNo}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              {/* Password input */}
              <input
                type="password"
                placeholder="Password"
                name="pwd"
                value={formData.pwd}
                onChange={handleInputChange}
              />
            </div>

             
           

          </div>

          {/* Button to trigger the form submission */}
          <div className="btn-field">
            <button
              type="button"
              id="signupbtn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
