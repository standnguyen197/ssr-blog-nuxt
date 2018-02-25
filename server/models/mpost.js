//Load mongoose use Database
var mongoose = require('mongoose');


// Define the Schema for our user model

var postSchema = mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    keyword: String,
    cover: String,
    category: String,
    content: String,
    date: Date,
    slug: String,
    status: { type: Number , default: 1 }
})


//Exports
module.exports = mongoose.model('db_posts' , postSchema);