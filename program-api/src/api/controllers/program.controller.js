const Program = require('../model/program.model');

async function create(req, res) {
    try {
        const { name , code, description } = req.body;
        const program = new Program({ name , code, description });
        const savedProgram = await program.save();
        res.status(201).json({ message: 'Program created successfully.',savedProgram });
      } catch (error) {
        res.status(500).json({ message: 'Error creating program', error });
      }
}


async function getAll(req, res) {
    try {
        const programs = await Program.find();
        res.json(programs);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving programs', error });
      }
}


async function getById(req, res) {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
          return res.status(404).json({ message: 'Program not found' });
        }
        res.json(program);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving program', error });
    }
}



async function update(req, res) {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
          new: true , // Return the modified document
        });
        if (!program) {
          return res.status(404).json({ message: 'Program not found' });
        }
        res.status(200).json({ message: 'Program updated successfully.',program });
      } catch (error) {
        res.status(500).json({ message: 'Error updating program', error });
      }
}

async function deleteOne(req, res){
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) {
          return res.status(404).json({ message: 'Program not found' });
        }
        res.json({ message: 'Program deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting program', error });
      }
}

module.exports = {
    create , getAll,
    getById, update,
    deleteOne
};