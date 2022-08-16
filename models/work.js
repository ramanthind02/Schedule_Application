const mongoose = require('mongoose')

const Schema = mongoose.Schema; 

const workSchema = new Schema ({

    storeNumber: {type:Number, required: true}, 
    shift: {type:String, required: true},
    name: {type:String, required: true}, 
    date: {
        day: {type:Number, required: true}, 
        month: {type:Number, required: true}, 
        year: {type:Number, required: true}
    }
    //creator: {type: mongoose.Types.ObjectId, required: true, ref:"User"}

}); 


module.exports = mongoose.model("Work", workSchema); 




