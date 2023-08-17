// config/database.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mouslimyahya545:rlrXVRWmgI4xKnbV@cluster0.prz8ql0.mongodb.net/emploiUI', {
  useNewUrlParser: true,
  
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
