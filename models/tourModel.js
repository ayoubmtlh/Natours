const mongoose=require("mongoose")
const tourSchema= new mongoose.Schema({
    name:{
      type:String,
      required:[true," name is required"] ,
      unique:[true,"name is unique"]
    },
    duration:{
      type:Number,
      required:[true,'A tour must have a duration']

    },
    maxGroupSize:{
      type:Number,
      required:[true,'A tour must have a groupe size']
    },
    difficulty:{
      type:String,
      trim:true,
      required:[true,'A tour must have a diffculty']
    },
    ratingsAverage:{
     type: Number,
      default:4.5},

      ratingsQuantity:{
        type: Number,
        default:0},
     
  
    price:{
      type:Number,
      required:[true,'A tour must have a price ']
  
    },
    priceDiscout:Number,
    summary:{
      type:String,
      required:[true,"A tour must have a description "]
    },
    description:{
      type:String,
    
    },
    imageCover:{
      type:String,
      required:[true,'A tour must have a cover image']

    },
    image:[String],
    createdAt:{
      type:Date,
      default:Date.now()
    },
   startDates:[Date]
  })
  const Tour=mongoose.model('Tour',tourSchema)

module.exports=Tour