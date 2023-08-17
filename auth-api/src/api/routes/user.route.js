const express = require('express');
const router = express.Router();
const {getDirecteur,getById,getEtudiant,deleteUser,authenticate,register,activate,getInstructors,getInstructorById} = require('../controllers/users.controller')


router.post('/login', authenticate);

router.post('/register', register);

router.get('/activate', activate);

router.get('/instructors',getInstructors);
router.get('/etudiant',getEtudiant);
router.get('/directeur',getDirecteur);

router.get('/instructors/:id',getInstructorById);

router.get('/users/:id',getById);

router.delete('/auth/:id',deleteUser);


module.exports = router;