const AppError=require("./../utils/appError")

const handleValidatorErrorDB=(err)=>{
    const error=Object.values(err.errors).map(el=>el.message)
    console.log(error)
   const  message=`${error.join('. ')}`
    return new AppError(message,400)

}
const handleJsonWebTokenErrorDB=()=>new AppError("Invalid token.Please login again!",401)
const handleTokenExpiredErrorDB=()=>new AppError("token expired.Please login again!",401)

const handleduplicateFieldsDB=(err)=>{
    const value=err.keyValue.name
    console.log(value)
  const message =`duplicate filed value:${value}. please use another value`
  return new AppError(message,400)
}

const handleCastErrorDB=(err)=>{
   const message=`Invalid ${err.path}: ${err.value}`
   return new AppError(message,400)
}

const sendErrorDev=(err,res)=>{
   res.status(err.statusCode).json({
        status:err.status,
        error :err,
        message:err.message,
        stack:err.stack
    })
}
const sendErrorProd=(err,res)=>{

    if(err.isOperational){
        res.status(err.statusCode).json({
             status:err.status,
             message:err.message
             
         })

    }else{
        console.error("ERROR 💥",err)
        res.status(500).json({
            status:'error',
            message:"Something went wrong !"
        })
    }
 }
 


module.exports=(err,req,res,next )=>{
    err.statusCode=err.statusCode ||500
    err.status=err.status || 'error'
    if(process.env.NODE_ENV==='development'){
         sendErrorDev(err,res)

    }else if(process.env.NODE_ENV==='production'){
        let error={...err}
        if(err.name==="CastError"){ error= handleCastErrorDB(error)}
        if(err.code===11000) {error=handleduplicateFieldsDB(error)}
        if(err.name==="ValidationError") error=handleValidatorErrorDB(error)
        if(err.name==="JsonWebTokenError") error=handleJsonWebTokenErrorDB()
        if(err.name==="TokenExpiredError") error=handleTokenExpiredErrorDB()

        sendErrorProd(error,res)
        
    }
}//err.ermsg.match(/(["'])(\\?.)*?\1/)[0]