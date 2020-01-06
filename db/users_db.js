let mongoose = require("mongoose");
let mongoose_plugin = require("mongoose-unique-validator");
let schema = mongoose.Schema;
let userchema = new schema({
     name:{
         type:String,
         required:true
     },
     surname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
})
let user = mongoose.model("user",userchema);
module.exports = user;