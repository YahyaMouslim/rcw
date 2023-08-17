const express = require('express');
const router = express.Router();
const {createSchedule,getAllSchedules,deleteSchedule}=require('../controllers/schedule.controller')

router.post('/schedules', createSchedule);
router.get('/schedules', getAllSchedules);
router.delete('/schedules/:id', deleteSchedule);

module.exports = router;