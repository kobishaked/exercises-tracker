const router = require('express').Router();
const User = require('../models/user.model');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
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







/**
 * questions:
 * 1.   there are few ways to send data from client to server such as within the url
 *      like the params and an object. also i can send from a form within the request
 *      body. when should i use each way?
 *      what are the reasons to do that?
 * 2.   
 */

