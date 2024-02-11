const mongoose=require("mongoose")
const Tour=require("./../../models/tourModel")
const fs=require("fs")
const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)


mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(con=>{
  //console.log(con.connections);
  console.log("DB cnnection successful!")
})
const importData=async ()=>{
    try{
  const newnote= await Tour.create(tours)
  console.log("the newData"+newnote)
    console.log("data loaded successfuly")
    }
    catch(err){
        console.log("something went wrong the ERROR:"+err)
    }
process.exit()
}
const deleteData =async()=>{
    try{
        await Tour.deleteMany()
        console.log("data deleted successfuly")
    }
    catch(err){
        console.log("something went wrong the ERROR:"+err)
    }
    process.exit()
}
if(process.argv[2]==='--import'){
    importData()
}
else
if(process.argv[2]==='--delete'){
    deleteData()
}

