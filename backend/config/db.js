const mongoose=require("mongoose")

async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true
    }).then((res)=>{
        console.log("db is connected")
    }).catch((error)=>{
        console.log("somethinag wrong in db connection"+error)
    })
}

connectDB();

module.exports=mongoose;
