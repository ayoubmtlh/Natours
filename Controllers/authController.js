const{promisify}=require("util")
const cacthAsync = require('../utils/cacthAsync')
const User=require('./../models/userModel')
const catchAsync=require("./../utils/cacthAsync")
const jwt=require('jsonwebtoken')
const AppError=require("./../utils/appError")
const sendEmail=require("./../utils/email")
const { read } = require("fs")
const signToken=id=>{
  return  jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN})

}
exports.signup=cacthAsync(async (req,res,next)=>{
   const newUser=await  User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    passwordChangeAt:req.body.passwordChangeAt,
    role:req.body.role

   })
   const token=signToken(newUser._id)

   res.status(201).json({
    status:'success',
    token,
    data:{
        user:newUser
    }
   })
});
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body
    //1)check if email and password exist 
    if(!email || !password){
        return next(new AppError('Please provide email and password!',400))

    }
      //2)check if user exist && password is correct

      const user = await User.findOne({ email }).select("+password")
if(!user || !await user.correctPassword(password,user.password)){
    return next(new AppError('Incorrect email or password',401))

}
//3)if every things id ok ,send token to client 
    const token=signToken(user._id)
    res.status(200).json({
        status:'success',
        token
    
    })
  

    
}) 
exports.protect=catchAsync(async(req,res,next)=>{
    //1)Getting token and check of it's there authorization
    let token
if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(" ")[1]
}
console.log(token)
if(!token){
    return next(new AppError("You are not logged in! Please log in to get access",401))
}
    //2)Verification token
const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET)
console.log(decoded)

    //3)check if user still exists
const freshUser= await User.findById(decoded.id)
 if(!freshUser){
    return next(new AppError("the user belonging to this token does no longer exist.",401))
 }
    //4)check if user changed password after the tokens was issued
    if(freshUser.changePasswordAfter(decoded.iat)){
        return next(new AppError("User recently changed password! Please log in again"))
    }
    req.user=freshUser
    console.log( req.user)
next()
})

exports.restrictTo= (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("You don't have permmission to perform this action",403))
        }
    
    next()
    }
}
exports.forgotPassword= cacthAsync( async (req,res,next)=>{
    //1)Get user based on Posted email
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new AppError("There is no user with email address",404))
    }
    //2)Generate the random reset token 
    const resetToken=user.createPasswordResetToken() 
    await user.save({validateBeforeSave:false})
    //3)send it to user's email
    const resetURL=`${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`
    const message=`Forgot your password?Submit a Patch request with your new password and passwordConfirm to:${resetURL}.\n if you didn't forget password, please ignore this email`
  try{  await sendEmail({
        email:user.email,
        subject:'Your password reset token (valid for 10 min)',
        message
    })
    res.status(200).json({
        status:"success",
        message:"Token sent to email !"

    })}
    catch(err){
        user.passwordResetToken=undefined
        user.passwordResetExpires=undefined
        await user.save({validateBeforeSave:false})
        return next(new AppError("There was an error sending the email.try again later!",500))
        

    }
})
exports.resetPassword=catchAsync(async(req,res,next)=>{})