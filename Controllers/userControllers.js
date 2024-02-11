const express = require("express");
const APIFeatures=require("./../utils/apiFeatures")
const catchAsync=require("./../utils/cacthAsync")
const User=require("./../models/userModel")

exports.getAllUsers=catchAsync(async(req,res)=>{
  const users=await User.find()
  if(users){
 return res.status(200).json({
  status:"success",
  result:users.length,
  data:{
    users
  }

 })}
 else{

    res.status(500).json(
      {
         status:"error",
         message:"This route is not yet defined!"
      }
    )
    }})

exports.createUser=(req,res)=>{
    res.status(500).json(
      {
         status:"error",
         message:"This route is not yet defined!"
      }
    )
  }
  

exports.getUsers=(req,res)=>{
    res.status(500).json(
      {
         status:"error",
         message:"This route is not yet defined!"
      }
    )
  }
  

exports.updateUser=(req,res)=>{
    res.status(500).json(
      {
         status:"error",
         message:"This route is not yet defined!"
      }
    )
  }
  

exports.DeleteUser=(req,res)=>{
    res.status(500).json(
      {
         status:"error",
         message:"This route is not yet defined!"
      }
    )
  }
  