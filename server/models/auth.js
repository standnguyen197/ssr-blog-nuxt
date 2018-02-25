//Load mongoose use Database
var mongoose = require('mongoose');

// Define the Schema for our user model

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role_id: { type: Number , default: 1 }
})


//Exports
module.exports = mongoose.model('db_users' , userSchema);