const express = require('express');
const router = express.Router();
const {
    create, getAll, getById, update, deleteOne
} = require('../controllers/program.controller');


router.post('/programs', create);

router.get('/programs', getAll);

router.get('/programs/:id', getById);

router.put('/programs/:id', update);

router.delete('/programs/:id', deleteOne);

module.exports = router;