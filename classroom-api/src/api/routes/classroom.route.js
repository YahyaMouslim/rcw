const express = require('express');
const router = express.Router();
const {
    create, getAll, getById, update, deleteOne
} = require('../controllers/classroom.controller');


router.post('/classrooms', create);

router.get('/classrooms', getAll);

router.get('/classrooms/:id', getById);

router.put('/classrooms/:id', update);

router.delete('/classrooms/:id', deleteOne);

module.exports = router;