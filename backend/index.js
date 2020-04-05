const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoGB database connection established succesfully");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises')
app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});



app.use(function (req, resp) {
    resp.end(JSON.stringify(req.path));
})

