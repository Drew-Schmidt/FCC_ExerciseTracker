const mongoose = require('mongoose')

const userModel = new mongoose.Schema({

  username: {
   
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  
  },

});

module.exports = mongoose.model('users', userModel)