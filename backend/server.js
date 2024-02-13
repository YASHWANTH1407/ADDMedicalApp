const express=require('express')
// const path=require('path')
//using it to mount my express app on server
const http=require('http')

const cors=require('cors')
const router=require('./router')
require('dotenv').config()
const app=express()

app.use(cors({  
    origin: process.env.FRONTEND_SERVER, 
  // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies) for cross-origin requests
  }));
  //used for request body parsing 
app.use(express.json())
app.use('/api',router)

const server=http.createServer(app)

const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})

