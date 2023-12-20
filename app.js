const express = require("express");
const app = express();
const morgan=require("morgan")
const fs = require("fs");
const tourRouter=require("./routes/tourRoutes")
const userRouter=require("./routes/userRoutes")
//1) MIDDLEWARE
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use(express.static(`${__dirname}/Controllers`))

app.use((req,res,next)=>{
  req.requestTime=new Date().toISOString()
  console.log(req.requestTime)
  next()

})

//2) ROUTES HANDLERS



// Define routes
//3)ROUTES

app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/users",userRouter)
//4)START SERVER
module.exports=app