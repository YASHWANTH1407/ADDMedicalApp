import React, { useState,useContext,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import "./Login.css";


const LogInRoute=import.meta.env.VITE_BACKEND

export default function Login() {
   
    const[loggedIn,setLoggedIn]=useState(null)
    const [clicked,setClick]=useState(false)
    const [option,setOption]=useState('login')
    const navigate = useNavigate();
    
    const handleSelectChange = (e) => {
      setOption(e.target.value);
    };


    const [info,setInfo]=useState({
        email:'',
        pwd:''
    })


    const postCreds = async () => {
        if (info.email && info.pwd) {
          try {
            
            const response = await fetch(`${LogInRoute}${option}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(info),
            });
      
            if (response.ok) {
                const token = await response.json();
                console.log('Login successful');
              // Store the token in localStorage
              localStorage.setItem('token', token);
              
              
      
              setLoggedIn(true);
              setInfo({
                email: '',
                pwd: ''
              });
            } else {
              const errorMessage = await response.text();
              console.log(`Login failed: ${errorMessage}`);
              setLoggedIn(false);
            }
          } catch (error) {
            console.log('Error during login:', error);
            setLoggedIn(false);
          }
        } else {
          console.log('Please fill out all the fields');
          setLoggedIn(false);
        }
      };
      

   const handleLogin = () => {
    setClick(true)
        postCreds();

};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
          ...info,
          [name]: value,
        });
      };

    const handleSignUpClick = () => {
        // Redirect to the SignUp page
        navigate("/signup");
    };

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="container">
            <div className="form-box">
                <h1 id="title">Log In</h1>
                <form>
                    <div className="input-group">
                        
                        <div className="input-field" id="emailfeild">
                            <i className="fa-solid fa-user"></i>
                            <input type="email" placeholder="Email" name="email" onChange={handleInputChange} />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-user"></i>
                            <input type={passwordShown ? "text" : "password"} name="pwd" placeholder="Password" onChange={handleInputChange} />
                            <Icon icon={passwordShown ? eyeOff : eye} onClick={togglePasswordVisibility} />
                        </div>
                        <select
                        name="usr"
                        id="prof"
                        value={option}
                        onChange={handleSelectChange}
                    >
                        <option value="doctor/login">Doctor</option>
                        <option value="login">Patient</option>
                    </select>

                    { loggedIn === false ? (<><p style={{ color: 'red' }}>Invalid email or password.</p><br /></>) : null}
                    {clicked==true && loggedIn==true? navigate('/'):null}

                        <div className="link-container">
                
                            <a href="#">Forgot password?</a>
                        </div>
                        
                    </div>
                    <div className="btn-field">
                        <button type="button" id="loginbtn" onClick={handleLogin}>Log in</button>
                        <button type="button" id="signupbtn" className="disable" onClick={handleSignUpClick}>Sign up</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
