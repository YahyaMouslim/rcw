const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
