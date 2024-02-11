const crypto=require("crypto")
const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const UserSchema=new mongoose.Schema({
    name:{type:String,require:[true,"A user must have a name !"]

    },
    email:{type:String,
        require:[true,"A user must have a email !"],
    unique:true,lowercase:true,validate:[validator.isEmail,"please provide a valid email "]
},



    photo:{type:String},
    password:{type:String,require:[true,"A user must have a password !"],minlength:8,select:false},
    passwordConfirm:{
        type:String,
      validate:{  validator:function(val){
            return val===this.password
},message:"Passwords are not the same !"},require:[true,"A user must have a passwordConfirm !"]},
passwordChangeAt:Date,role:{
    type:String, enum:["admin","user","lead-guide","guide"],default:"user"
},passwordResetToken:String,passwordResetExpires:Date
})
UserSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next()
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
    next()


})
UserSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
UserSchema.methods.changePasswordAfter=function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changedTimestamp=parseInt(this.passwordChangeAt.getTime()/1000,10 )
        console.log(changedTimestamp," ",JWTTimestamp," ",parseInt(Date.now()/1000))
        return JWTTimestamp < changedTimestamp
    }
    return false
}       

UserSchema.methods.createPasswordResetToken=function(){
const resetToken=crypto.randomBytes(32).toString('hex')
this.passwordResetToken=crypto.createHash("sha256").update(resetToken).digest("hex") 
console.log({resetToken},this.passwordResetToken)
this.passwordResetExpires=Date.now()+10*60*1000
return resetToken
} 
const User=mongoose.model("User",UserSchema)
module.exports=User


    
