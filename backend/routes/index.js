const express=require("express")
const routes=express.Router()

routes.use("/auth",require("./auth"))
routes.use("/blog",require("./blog"))

module.exports=routes;