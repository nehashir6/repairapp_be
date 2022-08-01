const mongoose = require('mongoose')

const Machine = mongoose.model('Machine', {
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
    }
})

module.exports = Machine