
const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator"); 

const Schema = mongoose.Schema; 

const userSchema = new Schema({

    uid : { type: Number, required: true}, 
    name: { type: String, required: true}, 
    phone: { type: Number, required: true}, 
    email: { type: String, required: true, unique: true}, 
    password: { type: String, required: true, minlength: 6},
    works: [{type: mongoose.Types.ObjectId, required: true, ref:"Work"}] 

}); 

userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model("User", userSchema); 



