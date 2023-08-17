const Schedule = require('../model/schedule.model');
const axios = require('axios'); 

const createSchedule = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { courseId, day, classroomId, programId, professorId, startTime, endTime } = req.body;

    // Fetch program, course, classroom, and professor data from respective microservices
    const [courseResponse, classroomResponse, professorResponse, programResponse] = await Promise.all([
      axios.get(`http://localhost:3002/api/v1/courses/${courseId}`, { headers: { Authorization: token } }),
      axios.get(`http://localhost:3001/api/v1/classrooms/${classroomId}`, { headers: { Authorization: token } }),
      axios.get(`http://localhost:3000/api/v1/instructors/${professorId}`, { headers: { Authorization: token } }),
      axios.get(`http://localhost:3003/api/v1/programs/${programId}`, { headers: { Authorization: token } })
    ]);

    // Construct the schedule object
    const newSchedule = new Schedule({
      course: courseResponse.data,
      classroom: classroomResponse.data,
      professor: professorResponse.data,
      program: programResponse.data,
      day,
      startTime,
      endTime,
    });

    // Check for schedule conflicts (both professor and classroom)
    const existingSchedules = await Schedule.find({
      day,
      $or: [
        { classroom: classroomId, startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { professor: professorId, startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existingSchedules.length > 0) {
      return res.status(409).json({ message: 'Conflit d\'emploi du temps détecté' });
    }

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
    
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports={
  createSchedule, getAllSchedules, deleteSchedule
}
