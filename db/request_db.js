let mongoose = require("mongoose");
let schema = mongoose.Schema
let tempschema = new schema(
    {
        user:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"user"
        },
        request_status:{
            type:String,
            default:"pending"
        },
        request_type:{
            type:String,
            default:"maintenance"
        },
        date:{
            type:String,
        },
        request_content:{
            type:String,
        }
    }
);
let request_schema = mongoose.model("request",tempschema);
module.exports = request_schema;