const express = require('express')
const http =require('http')
const app =express()
const cors=require('cors')
app.use(cors())
const {Server} =require('socket.io')
const server =http.createServer(app)

const io =new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

const consultationRequests = [];

//time to listen events 

// io.on('connection',(socket)=>{
//     console.log(`user connected ${socket.id}`);

//     // Listen for consultation requests
//     socket.on('consultationRequested', (data) => {
//         console.log(`Consultation requested by doctor with ID: ${data.doctorId} ${data.specialization}`);
//         // Store the consultation request
//         consultationRequests.push({ doctorId: data.doctorId, patientSocketId: socket.id });
// console.log(consultationRequests)

//         // Emit a notification to the doctor (you may need to implement logic to send notifications to specific doctors)
//         io.to(data.doctorId).emit('notification', { message: 'You have a new consultation request' });
//     });
    
// })

// io.on('connection', (socket) => {
//     console.log(`user connected ${socket.id}`);

//     // Listen for consultation requests
//     socket.on('consultationRequested', (data) => {
//         console.log(`Consultation requested by patient with ID: ${socket.id} for Doctor with ID: ${data.doctorId}`);
        
//         // Emit a notification to the doctor
//         io.to(data.doctorId).emit('notification', { 
//             message: `Patient with ID ${socket.id} has booked a consultation.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });

//         // Emit a notification to the patient
//         io.to(socket.id).emit('notification', { 
//             message: `Consultation request sent to Doctor with ID ${data.doctorId}.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });
//     });
// });

// io.on('connection', (socket) => {
//     console.log(`user connected ${socket.id}`);

//     // Join room based on user type (doctor or patient)
//     if (socket.userType === 'doctor') {
//         socket.join(socket.id); // Doctor joins room identified by their socket ID
//     } else {
//         socket.join('patients'); // Patients join a common room named 'patients'
//     }

//     // Listen for consultation requests
//     socket.on('consultationRequested', (data) => {
//         console.log(`Consultation requested by patient with ID: ${socket.id} for Doctor with ID: ${data.doctorId}`);
        
//         // Emit a notification to the doctor
//         io.to(data.doctorId).emit('notification', { 
//             message: `Patient with ID ${socket.id} has booked a consultation.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });

//         // Emit a notification to the patient
//         io.to(socket.id).emit('notification', { 
//             message: `Consultation request sent to Doctor with ID ${data.doctorId}.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });
//     });
// });


// io.on('connection', (socket) => {
//     console.log(`user connected ${socket.id}`);
    
//     // Join room based on user type (doctor or patient)
//     socket.on('setUserType', ({ userType }) => {
//         socket.userType = userType;
//         const room = `${userType}_${socket.id}`;
//         socket.join(room);
//         console.log(`User ${socket.id} identified as ${userType} and joined room ${room}`);
//     });

//     // Listen for consultation requests
//     socket.on('consultationRequested', (data) => {
//         console.log(`Consultation requested by patient with ID: ${socket.id} for Doctor with ID: ${data.doctorId}`);
        
//         // Emit a notification to the doctor
//         const doctorRoom = `doctor_${data.doctorId}`;
//         io.to(doctorRoom).emit('notification', { 
//             message: `Patient with ID ${socket.id} has booked a consultation.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });

//         // Emit a notification to the patient
//         const patientRoom = `patient_${socket.id}`;
//         io.to(patientRoom).emit('notification', { 
//             message: `Consultation request sent to Doctor with ID ${data.doctorId}.`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });
//     });
// });

// io.on('connection', (socket) => {
//     console.log(`user connected ${socket.id}`);

//     // Listen for consultation requests
//     socket.on('consultationRequested', (data) => {
//         console.log(`Consultation requested by patient with ID: ${socket.id} for Doctor with ID: ${data.doctorId}`);
        
//         // Emit a notification to all connected clients
//         io.emit('notification', { 
//             message: `Patient with ID ${data.patient} has booked a consultation to ${data.doctorFullName}`,
//             timestamp: new Date().toISOString(),
//             type: 'consultation_request',
//         });
//     });

    
// });

const doctorSockets = new Map();

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    // Assuming you have a way to identify doctors when they connect
    // For example, you can send their role (doctor or patient) during authentication
    socket.on('identifyDoctor', (doctorId) => {
        // Store the doctor's socket ID in the mapping
        console.log('doc identified')
        doctorSockets.set(doctorId, socket.id);
        console.log(doctorSockets)
    });

    // Listen for consultation requests
    socket.on('consultationRequested', (data) => {
        console.log(`Consultation requested by patient with ID: ${socket.id} for Doctor with ID: ${data.doctorId}`);
        
        // Get the socket ID of the doctor
        console.log(doctorSockets)
        const doctorSocketId = doctorSockets.get(data.doctorId);
        if (doctorSocketId) {
            console.log(doctorSocketId)
            console.log(`message sent succesfully`)
            // Emit the notification only to the specific doctor's socket
            io.to(doctorSocketId).emit('notification', { 
                message: `Patient with ID ${data.patient} has booked a consultation to ${data.doctorFullName}`,
                timestamp: new Date().toISOString(),
                type: 'consultation_request',
            });
        } else {
            console.log(`Doctor with ID ${data.doctorId} is not connected.`);
            // Optionally, you can handle the case where the doctor is not connected
        }
    });
});

app.post('/doctor-notifs',(req,res)=>{

})

app.post('/user-notifs',(req,res)=>{
    
})


server.listen(8080,()=>{
    console.log(`signalling at port:8080`)
})