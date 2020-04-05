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

router.get('/:id', async (req, res) => {
    try {
        const exersice = await Exersice.findById(req.params.id);
        res.json(exersice);
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

router.post('/update/:id', async (req, res) => {
    try {
        const exersice = await Exersice.findByIdAndUpdate(req.params.id);
        exersice.username = req.body.username;
        exersice.description = req.body.description;
        exersice.duration = Number(req.body.duration);
        exersice.date = Date.parse(req.body.date);
        exersice.save()
        res.json("exersice updated");
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
})


module.exports = router;
