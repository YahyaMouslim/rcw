const Course = require('../model/course.model');

async function create(req, res) {
    try {
        const { name , code, description, credits } = req.body;
        const course = new Course({ name , code, description, credits });
        const savedCourse = await course.save();
        res.status(201).json({ message: 'Course created successfully.',savedCourse });
      } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
      }
}


async function getAll(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error });
      }
}


async function getById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error });
    }
}



async function update(req, res) {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
          new: true , // Return the modified document
        });
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully.',course });
      } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
      }
}

async function deleteOne(req, res){
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
      }
}

module.exports = {
    create , getAll,
    getById, update,
    deleteOne
};