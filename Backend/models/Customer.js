const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const customerSchema= Schema({
    firstName:{
        type:String,
        maxLength:50
    },
    lastName:{
        type:String,
        maxLength:50
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        minLength:6
    }

});

const Customer=mongoose.model("customers",customerSchema)
module.exports={Customer};