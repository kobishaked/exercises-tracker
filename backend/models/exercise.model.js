const mongoose = require('mongoose');
// import mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: false},
    }, 
{
    timestamps: true,
});

const Exercise = mongoose.model('Exersice', exerciseSchema);

module.exports = Exercise;







/**
 * questions:
 * 1.   what are the generally differences between using import and using
 *      require and why cant i using import at this file  as showing on the 
 *      top of the file.
 *     
 */