const mongoose = require('mongoose');
//Creat a variable to shorten the reference to mongoose.Schema
const Schema = mongoose.Schema;

const CharterSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

//THis is the exporting on the compiled Charter model.  
//The model name is Charter, the Schema to compile from is CharterSchema
module.exports = mongoose.model('Charter', CharterSchema);