let User = require("../db/users_db");
let Request = require("../db/request_db");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let router = require("express").Router();
let moment = require("moment");
let uuid = require("uuid/v1")
let auth = require("../authenthicate");
//the signup post route
router.post("/signup",async (req,res)=>{
    try{
        //check if such username already exist in the database
        let data = await User.findOne({username:req.body.username});
        if(data){
            return res.status(401).send({error:"username already existed"});
        }
        let salt = bcrypt.genSaltSync(10);
        let user = new User(req.body);
        user.password = bcrypt.hashSync(user.password,salt);
         await user.save();
          console.log(user);
          let{name,_id,username,email,surname,role} = user;
         token = jwt.sign({name,_id,username,surname,email,role},"secret");
        res.send({token});
         
    }catch(err){
        res.status(401).send({err:"username already existed"});
    }

})
//the signin post route
router.post("/signin",async (req,res)=>{
    try{
        let user = await User.findOne({username:req.body.username})//the the data of the user base on the username
        //if nothing found send an error message to the client 
          if(!user){
              return res.status(401).send({error:"username not found or registered"})
          }
          //if the username is found check the password
          if(!bcrypt.compareSync(req.body.password,user.password)){
              return res.status(401).send({error:"password not correct"});
          }
          let{name,_id,username,email,surname,role} = user;
          token = jwt.sign({name,_id,username,surname,email,role},"secret");
         res.send({token});

    }catch(err){
    console.log({error:"username or password  not correct"});
      res.status(401).send({err:"an error occured in sign in"})
    }

})
//working on the create request route
router.post("/create-request",auth("user"),async (req,res)=>{
    try{
        let request = new Request(req.body);
        request.date = moment().format("L");
        let data = await request.save();
        res.send({request:[data]})

    }catch(err){

    }

})
router.get("/get-all-request",auth("user"),async (req,res)=>{
    try{
        let request =  await Request.find({user:req.user._id}).exec();
        console.log(request.length);
         res.send({request});
    }catch(err){
            console.log("error in get all request");
    }

})

module.exports = router;