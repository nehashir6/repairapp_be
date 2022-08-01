const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    personName: {
        type: String,
        required: true,
        trim: true
    },
    personAge: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    personHobbies: {
        type: String,
        required: true
    }
})

module.exports = Person