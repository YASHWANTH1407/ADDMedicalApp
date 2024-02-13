import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import LogIn from './pages/login/LogIn.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import { Consultancies } from "./pages/Consultancies/Consultancies.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
// import Prevconsul from "./pages/PrevCon/Prevconsul.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<App/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path='/consultancies' element={<Consultancies/>}></Route>
      <Route path='/notifications' element={<Notifications/>}></Route>

    </Routes>
  </BrowserRouter>

  </React.StrictMode>

);
