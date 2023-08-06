const express = require('express');
const router = express.Router();
const {
    create, getAll, getById, update, deleteOne
} = require('../controllers/course.controller');


router.post('/courses', create);

router.get('/courses', getAll);

router.get('/courses/:id', getById);

router.put('/courses/:id', update);

router.delete('/courses/:id', deleteOne);

module.exports = router;