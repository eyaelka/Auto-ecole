const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  username: { type: String, required: true, unique:true, lowercase: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique:true, lowercase: true },
  password: { type: String, required: true  },
  phone:{type: String, required: true },
  role: {type: String, default: "client"}
});





module.exports = mongoose.model('User',userSchema)