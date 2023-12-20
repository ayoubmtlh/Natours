// THIRD SECTION CODE const fs = require("fs")
const Tour=require("./../models/tourModel")
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

exports.getAllTours = async (req, res) => {
 try{
  let objectQuery={...req.query}
  const excludedFields=['page','sort','limit','fields']
  excludedFields.forEach(el=>delete objectQuery[el])
  let queryStr=JSON.stringify(objectQuery)
  queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
  let query=Tour.find(JSON.parse(queryStr))
  console.log(JSON.parse(queryStr))
  if(req.query.sort){
    const querySort=req.query.sort.split(",").join(' ')
    console.log(querySort)
    query=query.sort(querySort)
  }
  else{
    query=query.sort("-createdAt")
  }

  const tours=await query
 return res.status(200).json({
  status:"success",
  result:tours.length,
  data:{
    tours
  }

 })
 
}
catch(err){
  return res.status(404).json({
    status:'fail',
    message:"something go wrong: "+err
  })

}
}

  // THIRD SECTION CODE
   /* return res.status(200).json({
        status: "success",
        result: tr.length,
        requested:req.requestTime,
        data: {
          tours: tr,
        },
      });*/
  
  
  exports.getTourbyID = async(req, res) => {
    try{
     const tour= await Tour.findById(req.params.id)
     return res.status(200).json({
      status:"success",
      data:{
        tour
      }
    
     })
    }
    catch(err){
      return res.status(404).json({
        status:'fail',
        message:"something go wrong" + err
      })
    }
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
  }
  exports.createAtour = async(req, res) => {

    try{
      const newTour= await Tour.create(req.body)
      res.status(201).json({
        status:'success',
        data:{
          tour:newTour
        }
      })
    }catch(err){
      res.status(400).json({
        status:'fail',
        message:'invalid data sent'

      }
    )}
    }

    exports.updateAtour = async(req, res) =>{
      try{

      const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      })

      res.status(203).json({
        status:'success',
        data:{
          tour:tour
        }
      })
      }
      catch(err){  res.status(400).json({
        status:'fail',
        message:'invalid data sent'

      }

      )
    }
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
  };
  
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
  
  
  exports.DeleteAtour = async (req, res) => {
    try{
   await Tour.findByIdAndDelete(req.params.id)
    
    res.status(204).json({
      status:'success',
    })
    }
    catch(err){
      res.status(400).json({
        status:'fail',
        message:'invalid data sent'

      }

      )


    }
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
        
      })*/}