const mongoose = require('mongoose')

const Contractor = mongoose.model('Contractor', {
    contractorName: {
        type: String,
        required: true,
        trim: true
    },
    contractorSpecialty: {
        type: String,
        required: true
    }
})

module.exports = Contractor