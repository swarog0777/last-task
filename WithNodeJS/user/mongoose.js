const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    login: {type:String,unique:true},
    email: String,
    sex: String,
    name: String,
    age: Number,
    password: {type:String}
}, {versionKey: false});

mongoose.model("User", userScheme);
module.exports = mongoose.model("User");