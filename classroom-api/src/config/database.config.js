// config/database.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yahya9maazouz:q0kaRV5GR7TpB8Xs@users.5fdt3r8.mongodb.net/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
