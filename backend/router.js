//libraries
const express=require('express')
const Razorpay = require("razorpay");
const crypto = require("crypto");


//for schema
const Joi=require('joi')
require('dotenv').config()
const JWT = require('jsonwebtoken')
const {getDB,connectToDB}=require('./database')
const { error } = require('console')


const router=express.Router()

router.use(express.json())

//signup schema for USER
const signUpSchema = Joi.object({
  fn: Joi.string().required(),
  ln: Joi.string().required(),
  age:Joi.number().required(),
  email: Joi.string().email().required(),
  pwd: Joi.string().min(8).required(),
  phNo: Joi.string().required(),
});


//establishment of database connection
let db
connectToDB((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');

  db = getDB();
});


//function to generate token based on mongodb id
const generateToken= (firstName)=>{
  return JWT.sign({firstName},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'})
}

const DocToken= (firstName,specialization)=>{
  return JWT.sign({firstName,specialization},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'})
}

// Signup post request
router.post('/signup', async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body);

    if (error) {
      // If validation fails, send an error response
      return res.status(400).json({ message: error.message });
    }

    const { fn, ln, age, phNo, pwd, email } = value;

    // Perform signup logic, e.g., insert user data into the database
    const found = await db.collection('users').findOne({ $or: [{ phoneNumber: phNo }, { email: email }] });

    if (found) {
      res.status(400).send('User already exists');
      return;
    }
    await db.collection('users').insertOne({
      firstName: fn,
      lastName: ln,
      Age: age,
      phoneNumber: phNo,
      email: email,
      key: pwd,
    });

    console.log('Signup successful');

    // Send a success response to the client
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error processing signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
// Login post
router.post('/login', async (req, res) => {
  const LoginInfo = req.body;
  try {
    const user = await db.collection('users').findOne({ email: LoginInfo.email, key: LoginInfo.pwd });

    if (user) {
      const TOKEN = generateToken(user.firstName);
      res.status(200).json(TOKEN);
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.log(`Internal server error`);
    res.status(500).send('Internal server error');
  }
});

//we write a function to authenticate user token
const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid or missing Authorization header' });
  }



  const token = authHeader.split(' ')[1];
  
  try {
    const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(user)
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Unauthorized token.' });
  }
};


router.get('/user',authenticateToken,async (req,res)=>{
  try {
    // Access the authenticated user's information from the request object
    const fn = req.user.firstName;
    const spec= req.user.specialization;
    
    if (!spec) {
      // Regular user logic
      const user = await db.collection('users').findOne({ firstName: fn });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ user });
    } 
    // Fetch user information from the database using the user ID
    else {
      // Doctor logic
      const user = await db.collection('doctors').findOne({ firstName: fn });
      if (!user) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      return res.status(200).json({ user });
    }


  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})
///////////////////////////////////////////// DOCTOR SIIIIIDEEE /////////////////////////////////////////////////////////


const DoctorSchema = Joi.object({
  fn: Joi.string().required(),
  ln: Joi.string().required(),
  age:Joi.number().required(),
  email: Joi.string().email().required(),
  pwd: Joi.string().min(8).required(),
  phNo: Joi.string().required(),
  deg:Joi.string().required(),
  spec:Joi.string().required(),
  exp:Joi.number().required(),
  pin:Joi.number().required(),
  Rno:Joi.string().required()
});



router.post('/doctor/login', async (req, res) => {
  const LoginInfo = req.body;
  try {
    const user = await db.collection('doctors').findOne({ email: LoginInfo.email, key: LoginInfo.pwd });

    if (user) {
      const TOKEN = DocToken(user.firstName, user.specialization);
      
      // console.log(TOKEN)
      res.status(200).json(TOKEN);
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.log(`Internal server error`);
    res.status(500).send('Internal server error');
  }
});

router.post('/doctor/signup', async (req, res) => {
  try {
    const { error, value } = DoctorSchema.validate(req.body);

    if (error) {
      // If validation fails, send an error response
      return res.status(400).json({ message: error.message });
    }

    const { fn, ln, age, phNo, pwd, email ,deg,spec,exp,pin,Rno } = value;
    // 
    // Perform signup logic, e.g., insert user data into the database
    const found = await db.collection('doctors').findOne({$or:[{$or: [{ phoneNumber: phNo }, { email: email }] },{registrationNumber:Rno}]});

    if (found) {
      res.status(400).send('User already exists');
      return;
    }

    await db.collection('doctors').insertOne({
      firstName: fn,
      lastName: ln,
      Age: age,
      phoneNumber: phNo,
      email: email,
      degree:deg,
      specialization:spec,
      PIN:pin,
      status:false,
      experience:exp,
      registrationNumber:Rno,
      key: pwd
      
    });

    console.log('Doctor Signup successful');

    // Send a success response to the client
    res.status(200).json({ message: 'Doctor Signup successful' });
  } catch (error) {
    console.error('Error processing signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//getting a list of doctors

router.get('/get-doctors',async (req,res)=>{
  try{
    const doctorsObj=await db.collection('doctors').find({status:true})
    const doctors = await doctorsObj.toArray()
    
    res.status(200).json(doctors)
  }
  catch(err){
    res.status(500).json({err:'Internal server error'})
  }

})

router.put('/set-status',async (req,res)=>{
  try{
    const STATUS=req.body.status
    console.log(STATUS)
    const result = await db.collection('doctors').updateOne({firstName:req.body.fn,lastName:req.body.ln},{$set:{status:STATUS}})
    console.log('Negation of status:', !STATUS);

    if (result) {
      res.status(200).json({ msg: 'Update successful' });
    } else {
      res.status(404).json({ err: 'Document not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
})

//to send notification from user to doctor
router.post('/notify-doc',authenticateToken,(req,res)=>{
  
})

// RazorPay payment gateway

//create orders
router.post("/orders",async(req,res) => {
  try{
      const instance = new Razorpay({
          key_id: 'rzp_test_9QzxDs7nNM99bl',
          key_secret: 'k5rGqNghLNDVnGynrd5zFgnw',
      });

      const options = {
          amount:req.body.amount*100,
          currency:"INR",
          receipt:crypto.randomBytes(10).toString("hex"),
      };

      instance.orders.create(options,(error,order) => {
          if(error){
              console.log(error);
              return res.status(500).json({ message: "Something Went Wrong!"});
          }
          res.status(200).json({data:order});
      });
  }catch(error){
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
  }
});

//payment verify
router.post("/verify",async(req,res) => {
  try{
  const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature } = req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
      .createHmac("sha256",process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

      if (razorpay_signature === expectedSign){
          return res.status(200).json({ message: "Payment verified succefully" });
      }else{
          return res.status(400).json({ message: "Invalid signature sent!" });
      }
  }catch(error){
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
  }
});



//to export all routes
module.exports=router 


