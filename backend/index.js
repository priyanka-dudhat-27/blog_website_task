const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const port=process.env.PORT || 5000
const cors=require("cors")
const mongoose=require("./config/db")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/v1",require("./routes/index"))
app.listen(port,async(error)=>{
    (error)?console.log(error):console.log(`server is listening on ${port}`)
})