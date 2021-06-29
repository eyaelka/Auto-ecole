const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


//Pour Chaque post du forum on associe : 

const forumSchema = new Schema({
    body: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    comments: [{
      comment: { type: String },
      commentator: { type: String }
    }]
  });
  




  module.exports = mongoose.model('Forum', forumSchema);
