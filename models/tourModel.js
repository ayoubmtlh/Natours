const mongoose=require("mongoose")
const slugify=require("slugify")
const tourSchema= new mongoose.Schema({
    name:{
      type:String,
      required:[true," name is required"] ,
      unique:[true,"name is unique"]
    },
    slug:String,
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
   startDates:[Date],
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  })
  //Virtual fields that we see in output but it doesn't realy exist in the DB
  tourSchema.virtual("durationWeeks") .get(function(){
    return this.duration / 7;

  })
  //Document middleware:runs before .save() and .create() .insertMany: No
  tourSchema.pre("save",function(next){
    this.slug=slugify(this.name,{lower:true})
    next()

  })
  tourSchema.post("save",function(doc,next){
    console.log(doc)
    next()
  })
  tourSchema.pre("save",function(next){
       console.log("document will saved")
       next()
  })

const Tour=mongoose.model('Tour',tourSchema)
module.exports=Tour
