// THIRD SECTION CODE const fs = require("fs")
const Tour=require("./../models/tourModel")
const APIFeatures=require("./../utils/apiFeatures")
const catchAsync=require("./../utils/cacthAsync")
const AppError=require("./../utils/appError")
/*// THIRD SECTION CODE const tr = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  ); */

/* // THIRD SECTION CODE exports.checkID=(req,res,next,val)=>{
  // THIRD SECTION CODE
  console.log(val)
  const id = req.params.id * 1;
  const tour = tr.find((el) => el.id === id);
    if (!tour) {
      return res.status(404).json({
        result: "failed",
        message: "Invalid ID",
      });
    }
    
   next()

}*/
exports.getMonthlyPlan=catchAsync(async(req,res,next)=>{
  
    const year=req.params.year*1

    const plan=await Tour.aggregate([

      {
        $unwind: "$startDates"
      },{
        $match:{startDates:{
          $gte: new Date(`${year}-01-01`),
          $lte:new Date(`${year}-12-31`)
        }}
      },
   
      {
        $group:{
          _id:{$month:'$startDates'},
          numToursStarts:{$sum:1},
          tours:{$push:"$name"}
        }
      },   {
        $addFields:{month:"$_id"}
      },{
        $project:{_id:0}
      },{
        $sort:{numToursStarts:-1}
      },{
        $limit:12
      }
    
     ])
     return res.status(200).json({
      status:"success",
      /*result:Tour.length,*/
      data:{
        plan
      }
    
     })

  })

exports.getTourStat=catchAsync(async(req,res,next)=>{

     const stats=await Tour.aggregate([
      {
        $match:{ratingsAverage :{$gte: 4.5}}
      },
      {
        $group:{
          _id:{ $toUpper: '$difficulty'} ,
          avgRating:{$avg:'$ratingsAverage'},
          avgPrice:{$avg:'$price'},
          minRating:{$min:'$price'},
          maxRating:{$max:'$price'},

        }
      },
       {$sort:{avgPrice:1}
             
      },{$match : {_id:{$ne : "EASY"}}} 
     ])
     return res.status(200).json({
      status:"success",
      result:Tour.length,
      data:{
        stats
      }
    
     })
     })



exports.getAlias=catchAsync(async (req,res,next) => {
     req.query.limit='5'
     req.query.sort="-ratingsAverage,price"
     req.query.fields="name,price,ratingAverage,summary,difficulty"
     next()
})



exports.getAllTours = catchAsync(async (req, res,next) => {

 /*  //1)filtering
  let objectQuery={...req.query}
  const excludedFields=['page','sort','limit','fields']
  excludedFields.forEach(el=>delete objectQuery[el])
  let queryStr=JSON.stringify(objectQuery)
  queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
  let query=Tour.find(JSON.parse(queryStr))
  console.log(JSON.parse(queryStr))
  console.log(queryStr)
  console.log(objectQuery)

  //2)Sorting
  if(req.query.sort){
    const querySort=req.query.sort.split(",").join(' ')
    console.log(querySort)
    query=query.sort(querySort)
  }


  else{
    query=query.sort("-createdAt")
  }
  const feature=new APIFeatures(Tour.find(),req.query).filter().sort()
  //3)fields
  if(req.query.fields){
   const fields=req.query.fields.split(",").join(" ")
    query.select(fields)
  }
//4)pagination and limits
  const limit=req.query.limit*1 || 100
  const page= req.query.page*1 || 1
  const skip= (page-1)*limit
  query=query.skip(skip).limit(limit)
  if(req.query.page){
    const numTours=await Tour.countDocuments()
    if(skip>=numTours) throw new Error("this page is not exist ")
  }*/
  const feature=new APIFeatures(Tour.find(),req.query).filter().sort().fields().pagination()
  const tours=await feature.query
 return res.status(200).json({
  status:"success",
  result:tours.length,
  data:{
    tours
  }

 })
 })
 




  // THIRD SECTION CODE
   /* return res.status(200).json({
        status: "success",
        result: tr.length,
        requested:req.requestTime,
        data: {
          tours: tr,
        },
      });*/
  
  
  exports.getTourbyID =catchAsync( async(req, res,next) => {

     const tour= await Tour.findById(req.params.id)
     if(!tour){
      return next(new AppError("this tour is not exist",404))
     }
     return res.status(200).json({
      status:"success",
      data:{
        tour
      }
    
     })
    })
    
    // THIRD SECTION CODE
    /*
    console.log(req.params)
    const id = req.params.id * 1;
    const tour = tr.find((el) => el.id === id);
   return res.status(200).json({
      result: "success",
      data: {
        tour,
      },
    });
*/
  
  exports.createAtour =catchAsync( async(req, res,next) => {

      const newTour= await Tour.create(req.body)
      res.status(201).json({
        status:'success',
        data:{
          tour:newTour
        }
      })
    })

    exports.updateAtour = catchAsync( async(req, res,next) =>{

      const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      })
      if(!tour){
        return next(new AppError("this tour is not exist",404))
       }

      res.status(203).json({
        status:'success',
        data:{
          tour:tour
        }
      })
      })
    // THIRD SECTION CODE
    /*
    const newId = tr[tr.length - 1].id + 1;
    const obj = Object.assign({ id: newId }, req.body);
    tr.push(obj);
    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tr),
      (err) => {
        if (err) {
          return res.status(500).json({
            result: "failed",
            message: "Error while creating tour",
          });
        }
    return    res.status(201).json({
          result: "success",
          data: {
            obj,
          },
        });
      }
    );
    */
  
  
  //exports.updateAtour = (req, res) => {
    // THIRD SECTION CODE
    /*
    const id = req.params.id * 1;
    const tour = tr[id]
    const updateTour = Object.assign(tour, req.body);
    const index = tr.indexOf(tour);
    tr[index]=updateTour
    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tr),
      (err) => {
        if (err) {
          return res.status(500).json({
            result: "failed",
            message: "Error while updating tour",
          });
        }
       return res.status(200).json({
          result: "success",
          data: {
            tour,
          },
        });
      }
    );
    */
  
  
  exports.DeleteAtour = catchAsync(async (req, res,next) => {

   const tour=await Tour.findByIdAndDelete(req.params.id)
   if(!tour){
    return next(new AppError("this tour is not exist",404))
   }
    
    res.status(204).json({
      status:'success',
    })
    })

    // THIRD SECTION CODE
    /*
    const id = req.params.id * 1;
    const tour = tr[id]
    const index = tr.indexOf(tour);
    tr.splice(index, 1);
    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tr),
      (err) => {
        if (err) {
          return res.status(500).json({
            result: "failed",
            message: "Error while deleting tour",
          });
        }
        return res.status(204).json({
          result: "success",
          data: {
            tour: null,
          },
        });
        
      })*/