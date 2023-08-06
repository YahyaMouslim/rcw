const Classroom = require('../model/classroom.model');

async function create(req, res) {
    try {
        const { name, capacity, location } = req.body;
        const classroom = new Classroom({ name, capacity, location });
        const savedClassroom = await classroom.save();
        res.status(201).json({ message: 'Classroom created successfully.',savedClassroom });
      } catch (error) {
        res.status(500).json({ message: 'Error creating classroom', error });
      }
}


async function getAll(req, res) {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving classrooms', error });
      }
}


async function getById(req, res) {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
          return res.status(404).json({ message: 'Classroom not found' });
        }
        res.json(classroom);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving classroom', error });
    }
}



async function update(req, res) {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
          new: true , // Return the modified document
        });
        if (!classroom) {
          return res.status(404).json({ message: 'Classroom not found' });
        }
        res.status(200).json({ message: 'Classroom updated successfully.',classroom });
      } catch (error) {
        res.status(500).json({ message: 'Error updating classroom', error });
      }
}

async function deleteOne(req, res){
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) {
          return res.status(404).json({ message: 'Classroom not found' });
        }
        res.json({ message: 'Classroom deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting classroom', error });
      }
}

module.exports = {
    create , getAll,
    getById, update,
    deleteOne
};