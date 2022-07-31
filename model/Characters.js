const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    familiy: String,
    firstName: String,
    fullName: String,
    lastName: String,
    image : String,
    imageUrl : String,
    title: String
});


module.exports = mongoose.model('fullStack_Character',characterSchema);