//importing of the needed modules
let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let user_router = require("./routes/user");
let admin_router = require("./routes/admin");
let path = require("path")
let app = express();

//initializing the middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}));
//createing the port for app to listen to
let port = process.env.Port || 4000;
//connecting to the mongodb server with mongoose

//placing the user and the admin router to the main server app.use()
app.use("/api/user",user_router);
app.use("/api/admin",admin_router);
if(process.env.NODE_ENV = "productuon"){
    app.use(express.static("tracker/build"))
    app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"tracker","build","index.html"));
    })
}
if(process.env.PORT){
mongoose.connect('mongodb://localhost/management_tracker', {useNewUrlParser: true});
}else{
    
mongoose.connect('mongodb://localhost/management_tracker', {useNewUrlParser: true});
}


mongoose.connection.once("open",()=>{
    console.log("the database is open and working perfectly");
})
//express listening to the port 
app.listen(port,function(){
    console.log("server is listening to the port 4000");
})




