const mongoose = require('mongoose');

//Define Schema
const UsersSchema = new mongoose.Schema({
    email: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },    
}, 
{ 
  versionKey: false
});

module.exports = mongoose.model('Users', UsersSchema);