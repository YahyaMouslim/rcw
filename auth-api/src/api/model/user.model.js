const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  activationToken: String,
  activationTokenExpiry : { type: Number },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  active: { type: Boolean, default: false }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model('User', userSchema);