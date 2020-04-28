const router = require('express').Router();
const Exersice = require('../models/exercise.model');


router.get('/', async (req, res) => {
    try {
        const exersices = await Exersice.find();
        res.json(exersices);
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }

})

router.post('/add', async (req, res) => {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);
       
        const newExercise = new Exersice({ username, description, duration, date, });
        await newExercise.save();
        res.json('exercise added!')
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.get('/:username', async (req, res) => {
    try {
        const exersices = await Exersice.find({username: `${req.params.username}`} );
        res.json(exersices);
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Exersice.findByIdAndDelete(req.params.id);
        res.json("exersice deleted");
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const oldExersice = await Exersice.findByIdAndUpdate(req.params.id);
        oldExersice.description = req.body.description;
        oldExersice.duration = Number(req.body.duration);
        oldExersice.date = Date.parse(req.body.date);
        await oldExersice.save()
        const UpdatedExercisesByUser = await Exersice.find({username: `${req.body.username}`} );
        res.json(UpdatedExercisesByUser);
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
})



module.exports = router;
