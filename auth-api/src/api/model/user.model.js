const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  password: String,
  activationToken: String,
  activationTokenExpiry : { type: Number },
  role: { type: String, enum: ['USER', 'PROGRAM_DIRECTOR','STUDENT','INSTRUCTOR'], default: 'USER' },
  active: { type: Boolean, default: false }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);