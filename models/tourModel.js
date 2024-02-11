const mongoose=require("mongoose")
const slugify=require("slugify")
const validator=require("validator")
const tourSchema= new mongoose.Schema({
    name:{
      type:String,
      required:[true," name is required"] ,
      unique:[true,"name is unique"],
      trim:true,
      maxlength:[40,"a tour must be less or equals then 40 characters"],
      minlength:[10,"a tour must have more or equals then 10"]

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
      required:[true,'A tour must have a diffculty'],
      enum:{
        
       values: ['easy','medium','difficult'],
       message:"Dfficulty is either: easy,medium or diffuclt"},

    },
    ratingsAverage:{
     type: Number,
      default:4.5,
      min:[1,"Rating must above 1.0"],
      max:[5,'Rating must to be less than 5.0']
    },

      ratingsQuantity:{
        type: Number,
        default:0},
     secretTour:Boolean,
  
    price:{
      type:Number,
      required:[true,'A tour must have a price ']
  
    },
    priceDiscount:{type:Number,
    validate:{
      //validator works only for create (for post only)
      validator:function(val){
        return val<this.price
      },
      message:"the priceDiscount must be less than the original price"
    }
    }
    ,
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
  //.pre() exucuted before .post() post no matter what is the standing in the code 
  tourSchema.pre("save",function(next){
    this.slug=slugify(this.name,{lower:true})
    next()

  })
  /*
  tourSchema.post("save",function(doc,next){
    console.log(doc)
    next()
  })
  tourSchema.pre("save",function(next){
       console.log("document will saved")
       next()
  })
  */
 //Query middleware
 tourSchema.pre(/^find/,function(next){
  this.find({secretTour:{$ne:true}})
  this.start=Date.now()
  next()
 })

 tourSchema.post(/^find/,function(docs,next){
  console.log(`The query took ${Date.now() - this.start} millesecond`)
  //console.log(docs)
next()
 })


 tourSchema.pre(/^find/,function(next){
 
  next()
 })

 tourSchema.pre("aggregate",function(next){
  this.pipline.unshift({$match: {secretTour:{$ne:true}}})
  next()

 })

const Tour=mongoose.model('Tour',tourSchema)
module.exports=Tour
