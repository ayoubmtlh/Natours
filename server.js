const mongoose=require("mongoose")
const Tour=require("./models/tourModel.js")
const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
const app=require("./app.js")
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)


mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(con=>{
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
app.listen(8000, () => {
    console.log("Listening on port 8000...");
  });
  