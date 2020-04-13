const router = require('express').Router();
const User = require('../models/user.model');
const Exersice = require('../models/exercise.model');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }

})


router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Exersice.findByIdAndDelete(req.params.id);
        res.json("user deleted");
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }
}) 



router.post('/add', async (req, res) => {
    try {
        const username = req.body.username;
        const newUser =  await new User ({username});
        await newUser.save();
        res.json('user added!')
    }
    catch (error) {
        res.status(400).json('Error: ' + error);
    }

})



module.exports = router;









