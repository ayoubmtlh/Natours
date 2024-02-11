const mongoose=require("mongoose")
const Tour=require("./models/tourModel.js")
const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
process.on('uncaughtException',err=>{
  console.log(err.name,err.message)
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
    process.exit(1)
  })
  process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    console.log('UNHADLED REJECTION! 💥 Shutting down...')
      process.exit(1)
  })
const app=require("./app.js")
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)


mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then((con)=>{
  //console.log(con.connections);
  console.log("DB cnnection successful!")
})



//console.log(process.env)
/*const testTour=new Tour({
  name:'The Park Camper',
  price:997

})
testTour.save().then(doc=>{
  console.log(doc)
  console.log('Document saved')
}).catch(err=>{
  console.log("ERROR 💥💥",err)
})
*/
const server=app.listen(8000, () => {
    console.log("Listening on port 8000...");
  });
/*  process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    console.log('UNHADLED REJECTION! 💥 Shutting down...')
    server.close(()=>{
      process.exit(1)
    })})
    process.on('uncaughtException',err=>{
      console.log(err.name,err.message)
      console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
      server.close(()=>{
        process.exit(1)
      })
  })*/