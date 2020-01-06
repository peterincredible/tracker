let Request = require("../db/request_db");
let router = require("express").Router();
let auth = require("../authenthicate");
router.use(auth("admin"));//applying the auth middleware so it binds totally on every route in this router
//this returns all the request to the admin client
router.get("/get-all-request",async (req,res)=>{
    try{
        let request =  await Request.find({}).populate("user").exec();
    
         res.send({request});
    }catch(err){
            console.log("error in admin get all request");
    }

})
//this route returns all pending request to the client
router.get("/get-all-pending-request",async (req,res)=>{
    try{
        let request =  await Request.find({request_status:"pending"}).populate("user").exec();
         res.send({request});
    }catch(err){
            console.log("error in admin get all pending request");
    }

})
//this route returns all the rejected request to the client
router.get("/get-all-rejected-request",async (req,res)=>{
    try{
        let request =  await Request.find({request_status:"rejected"}).populate("user").exec();
         res.send({request});
    }catch(err){
            console.log("error in admin get all rejected request");
    }

})
//this route returns all the resolved request to the client
router.get("/get-all-resolved-request",async (req,res)=>{
    try{
        let request =  await Request.find({request_status:"resolved"}).populate("user").exec();
         res.send({request});
    }catch(err){
            console.log("error in admin get all pending request");
    }

})
//this route returns all the accepted request to the client
router.get("/get-all-accepted-request",async (req,res)=>{
    try{
        let request =  await Request.find({request_status:"accepted"}).populate("user").exec();
         res.send({request});
    }catch(err){
            console.log("error in admin get all pending request");
    }

})
//this route get the request id and change the request status from pending to accept
router.get("/accept-request/:id",async (req,res)=>{
    try{
         await Request.findByIdAndUpdate(req.params.id,{request_status:"accepted"},{new:true})
         res.send("")
    }catch(err){
            console.log("error in admin get accept request");
            res.status(401).send("an error")
    }

});
//this route get the request id and change the request status from pending to rejected
router.get("/reject-request/:id",async (req,res)=>{
    try{
         await Request.findByIdAndUpdate(req.params.id,{request_status:"rejected"},{new:true})
         res.send("")
        
    }catch(err){
            console.log("error in admin get reject request");
            res.status(401).send("an error")
    }

});
//this route get the request id and change the request status from accepted to resolved
router.get("/resolve-request/:id",async (req,res)=>{
    try{
         await Request.findByIdAndUpdate(req.params.id,{request_status:"resolved"},{new:true})
         res.send("")
    }catch(err){
            console.log("error in admin get resolved request");
            res.status(401).send("an error")
    }

});

module.exports = router;