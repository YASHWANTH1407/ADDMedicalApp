// import React from "react";
// import "./Hero.css";
// const Hero = () => {
//   return (
//     <section className="hero-wrapper">
//       <div className="paddings innerWidth flexCenter hero-container">
//       <div className="flexColStart hero-left">
//         <div className="hero-title">
//             <div className="orange-circle"/>
//           <h1>
//             Your Pathway to <br />
//             Holistic Care
//           </h1>
//         </div>


//         <div className="flexColStart hero-des">
//           <span>Transforming Healthcare, One Consultation at a Time</span>
//           <span>Navigating Your Wellness with Chikitsa</span>
//     </div>
     

//       <div className="flexCenter hero-right">
//         <div className="image-container">
//           <img src="./Doctor2.png" alt="" />
        
//       </div>
//       </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React from "react";
// import "./Hero.css";
// // import CountUp from "react-Countup";

// const Hero = () => {
//   return (
//     <section className="hero-wrapper">
//       <div className="paddings innerWidth flexCenter hero-container">
//         <div className="flexColStart hero-left">
//           <div className="hero-title">
//             <div className="orange-circle" />
//             <h1>
//               Your Pathway to <br />
//               Holistic Care
//             </h1>
//           </div>  
          
//           <div className="flexColStart hero-des">
//             <span>Transforming Healthcare,</span>
//             <span>Navigating </span>
//           </div>
//         </div>
//         <div className=" flexCenter stats">
//           {/* <div className="flexColstart stat">
//             <span>
//               <CountUp start={8800} end={9000} duration={4}/>
//               <span></span>
//               Premium Products
//             </span>
//           </div> */}
//         </div>
//         <div className="flexCenter hero-right">
//           <div className="image-container">
//             <img src="./Doctor2.png" alt="" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="blue-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Your Pathway to <br />
              Holistic Care
              <br /> 
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
          <span >Tranorming Healthcare, One Consultation at a Time</span>
            <span>Navigating Your Wellness with Chikitsa</span>
          </div >

          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div>

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Patients Cured</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Doctors</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={18} /><span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./Doctor2.png" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>

    
  );
};

export default Hero;