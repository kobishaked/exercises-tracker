const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
const usi1 = process.env.MONGODB_URI;
mongoose.connect(usi1 || uri, { useNewUrParser: true, useCreateIndex: true }
);


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoGB database connection established succesfully");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises')
app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build'))
    })
}

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});



app.use(function (req, resp) {
    resp.end(JSON.stringify(req.path));
})

