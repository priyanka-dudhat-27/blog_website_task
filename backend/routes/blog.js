const express=require("express");
const routes=express.Router();
const blogController=require("../controllers/blogController");
const { requireLogin } = require("../middlewares/requireLogin");

routes.get("/getAllblogs",blogController.getAllblogs)
routes.post("/add",requireLogin,blogController.add)
routes.put("/update/:id",requireLogin,blogController.update)
routes.delete("/delete/:id",requireLogin,blogController.delete)
routes.get("/getByUserId/:id",requireLogin,blogController.getByUserId)

module.exports=routes;