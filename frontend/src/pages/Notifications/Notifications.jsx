// // // import {useState,useEffect} from 'react'
// // // import io from 'socket.io-client'


// // // const BACKEND =import.meta.env.VITE_BACKEND

// // // export default function Notifications() {


// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [userData, setUserData] = useState(null);
// // //   const [isDoctor, setIsDoctor] = useState(false);
// // //   const [notifications,setNotifications] = useState(null)

// // //   useEffect(()=>{
// // //     const socket =io.connect('http://localhost:8080')
// // //     socket.on('notifications',(data)=>{
// // //       setNotifications(data)
// // //     })
// // //   },[])


// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');

// // //     if (token) {
// // //       const endpoint = 'user';

// // //       fetch(`${BACKEND}/${endpoint}`, {
// // //         method: 'GET',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //       })
// // //       .then(response => response.json())
// // //       .then(data => {
// // //         setIsLoggedIn(true);
// // //         setUserData(data.user);
// // //         if (data.user.specialization) {
// // //           setIsDoctor(true);
// // //         }
// // //       })
// // //       .catch(error => {
// // //         console.error('Error fetching user data:', error);
// // //       });
// // //     } else {
// // //       console.log('User not logged in'); // Handle user not being logged in
// // //     }
// // //   }, []);

// // // console.log(isDoctor)
// // // console.log(userData)
// // //   return (
// // //     <div>
// // //       {/* {isDoctor?<h1>Dr.{userData.firstName}'s Notifications</h1>:<h1>{userData.firstName}'s Notifications</h1>} */}
// // //       {userData ? (
// // //         <h1>{isDoctor ? `Dr.${userData.firstName}'s Notifications` : `${userData.firstName}'s Notifications`}</h1>
// // //       ) : (
// // //         <h1>Loading...</h1>
// // //       )}
// // //       {/* REST OF THE NOTIFICATIONS HERE */}

// // //     </div>

    
// // //   )
// // // }

// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';

// // const BACKEND = import.meta.env.VITE_BACKEND;

// // const Notifications = () => {
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);
// //     const [userData, setUserData] = useState(null);
// //     const [isDoctor, setIsDoctor] = useState(false);
// //     const [notifications, setNotifications] = useState([]);

// //     useEffect(() => {
// //         const token = localStorage.getItem('token');

// //         if (token) {
// //             const endpoint = 'user';

// //             fetch(`${BACKEND}/${endpoint}`, {
// //                 method: 'GET',
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`,
// //                     'Content-Type': 'application/json'
// //                 },
// //             })
// //             .then(response => response.json())
// //             .then(data => {
// //                 setIsLoggedIn(true);
// //                 setUserData(data.user);
// //                 if (data.user.specialization) {
// //                     setIsDoctor(true);
// //                 }

// //                 const socket = io.connect('http://localhost:8080');
                
// //                 socket.on('notification', (data) => {
// //                   console.log(data)
// //                     setNotifications(prevNotifications => [...prevNotifications, data]);
// //                 });
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching user data:', error);
// //             });
// //         } else {
// //             console.log('User not logged in');
// //         }
// //     }, []);
// //     console.log(notifications)

// //     return (
// //         <div>
// //             {userData ? (
// //                 <h1>{isDoctor ? `Dr.${userData.firstName}'s Notifications` : `${userData.firstName}'s Notifications`}</h1>
// //             ) : (
// //                 <h1>Loading...</h1>
// //             )}

// //             <div className="notification-bar">
// //                 {/* <h2>Notifications</h2> */}
// //                 <ul>
// //                     {notifications.map((notification, index) => (
// //                         <li key={index}>
// //                             <strong>{notification.message}</strong> - {new Date(notification.timestamp).toLocaleString()}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Notifications;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const BACKEND = import.meta.env.VITE_BACKEND;

// const Notifications = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [isDoctor, setIsDoctor] = useState(false);
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             const endpoint = 'user';

//             fetch(`${BACKEND}/${endpoint}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//             })
//             .then(response => response.json())
//             .then(data => {
//                 setIsLoggedIn(true);
//                 setUserData(data.user);
//                 if (data.user.specialization) {
//                     setIsDoctor(true);
//                 }


//             })
//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//             });
//         } else {
//             console.log('User not logged in');
//         }
//     }, [isDoctor]); // Add isDoctor to the dependency array to re-run the effect when it changes

    
//     useEffect(() => {
//       const socket = io.connect('http://localhost:8080');
      
//       // Listen for notifications from the server
//       socket.on('notification', (data) => {
//           // Add the new notification to the list
//           setNotifications(prevNotifications => [...prevNotifications, data]);
//       });

//       // Cleanup function to disconnect the socket when component unmounts
//       return () => {
//           socket.disconnect();
//       };
//   }, []);
//     return (
//         <div>
//             {userData ? (
//                 <h1>{isDoctor ? `Dr.${userData.firstName}'s Notifications` : `${userData.firstName}'s Notifications`}</h1>
//             ) : (
//                 <h1>Loading...</h1>
//             )}

//             <div className="notification-bar">
//             <ul>
//                 {notifications.map((notification, index) => (
//                     <li key={index}>
//                         <strong>{notification.message}</strong> - {new Date(notification.timestamp).toLocaleString()}
//                     </li>
//                 ))}
//             </ul>
//             </div>
//         </div>
//     );
// };

// export default Notifications;


///////////////IKKADA NOTIFICATIONS UPDATE AVVALI
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BACKEND = import.meta.env.VITE_BACKEND;

const Notifications = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);
    const [notifications, setNotifications] = useState([]);

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
            console.log('User not logged in');
        }
    }, []);


    return (
        <div>
            {userData ? (
                <h1>{isDoctor ? `Dr.${userData.firstName}'s Notifications` : `${userData.firstName}'s Notifications`}</h1>
            ) : (
                <h1>Loading...</h1>
            )}

            <div className="notification-bar">
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            <strong>{notification.message}</strong> - {new Date(notification.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;
