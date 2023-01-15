const mongoose = require('mongoose')

const exerciseModel = new mongoose.Schema({

  description: { 
    type: String,
    required: true 
  
  },
  
  duration: { 
    type: Number, 
    required: true 
  
  },
  
  date: { 
    type: Date, 
    required: true 
  
  },

  parsedDate: {
    type: Number,
  
  },

  userId:{
    type: String,
    required: true,
    
  }

}, {timestamps: true});

module.exports = mongoose.model('exercises', exerciseModel)