import {React,useState,useEffect} from "react"; 
import App from "../../App";
import {Link,useNavigate} from'react-router-dom'
import "./Header.css"
import { IoPersonOutline } from "react-icons/io5";


const BACKEND =import.meta.env.VITE_BACKEND

const Header = () => {
  
  //states to track whether the user is doctor or patient
  const [isDoctor,setIsDoctor] = useState(false)

  /////////////////////////////////////////////////

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropDown,setUserDropDown]= useState(false)
  const [userData,setUserData] =useState(null)

  //variable to set user data
  const [status,setStatus] =useState(null)
  

  const navigate = useNavigate();
  const ENDPOINT = import.meta.env.VITE_USER_ENDPOINT


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click",function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior:"smooth"
      });
    });
  });



  const toggleDD = ()=>{
    setUserDropDown(!userDropDown)
  }

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  
    // Additional logout logic if needed
     
    // Redirect to the home page
    navigate('/login');
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
     const endpoint ='user'
  
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
        if(data.user.specialization){
          setIsDoctor(true)
        }

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleStatus = async () => {
    try {
      // Toggle the status locally
      const newStatus = !userData.status;
      setUserData((prevData) => ({ ...prevData, status: newStatus }));
  
      // Update the status on the server
      const resp = await fetch(`${BACKEND}/set-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fn: userData.firstName,
          ln: userData.lastName,
          status: newStatus,
        }),
      });
  
      if (resp.ok) {
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update the status');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const toggleSwitch = () => {
    // Call the handleStatus function to toggle the status
    handleStatus();
  };



  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img className="logo" src="./Chikitsa-logos_white.png" alt="logo" width={100} />

        <div className="flexCenter h-menu">
          <Link to="/">Chikitsa</Link>
          <a href="#AboutUs">About Us</a>
          <a href="#Footer">Contact us</a>
          {!isDoctor &&isLoggedIn?<a href=""><Link to="/consultancies">Consultations</Link></a>:null}

          {isLoggedIn ? (
          <div className="user-info">
            <button className="button" onClick={toggleDD}>
              {userData ? (
                <>
                  <IoPersonOutline /> &nbsp; {`${userData.firstName}`}
                </>
              ) : (
                'User Options'
              )}
            </button>
            {userDropDown && (
              <div className="dropdown-content">
                {isDoctor ? (
                  <>                
                  {/* This is still under work */}
                    <Link to="/">
                      <h4>Doctor buddy</h4>
                    </Link>
                   
                   <div className="status-switch">
                        <label>Offline</label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={userData.status}
                            onChange={toggleSwitch}
                          />
                          <span className="slider round"></span>
                        </label>
                        <label>Online</label>
                      </div>
                    <Link to='/notifications'> <h4>Notifications</h4></Link>

                  </>
                  
                ) : (
                  <>
                    
                    <Link to="/my-addresses">
                      <h4>My Addresses</h4>
                    </Link>
                    <Link to="/report-bugs">
                      <h4>Report bugs</h4>
                    </Link>
                    <Link to='/notifications'> <h4>Notifications</h4></Link>

                  </>
                )}
                <button className="button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="button">Log in</button>
          </Link>
        )}

        </div>
      </div>
    </section>
  );
};


export default Header;
