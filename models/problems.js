const mongoose = require('mongoose')

const Problem = mongoose.model('Problem', {
    machineName: {
        type: String,
        required: true,
        trim: true
    },
    machineBrand: {
        type: String,
        required: true,
        trim: true
    },
    machineModelNo: {
        type: String,
        required: true,
        trim: true
    },
    problemDescription: {
        type: String,
        required: true,
        trim: true
    },
    tags:[{
        type: String,
        trim: true
    }],
    solutionList: [{
        solution: {
            type: String
        }
    }]
})

module.exports = Problem
