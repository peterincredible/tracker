let jwt_decode = require("jwt-decode");
let User = require("./db/users_db");

function auth(role){
    return async (req,res,next)=>{
        try{
            let Client_details = jwt_decode(req.headers["authorization"]);
            let user = await User.findOne({username:Client_details.username});
            if(user){
                if(user.role == "admin"||user.role == role){
                  req.user = user;
                    return next()
                   }
            } 
          }catch(err){
            console.log("error in auth functions")
            res.status(401).send({error:"user is not authorized to view this page"});
          }
    }
}
module.exports = auth;