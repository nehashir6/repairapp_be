const mongoose = require('mongoose')

const Supplier = mongoose.model('Supplier', {
    supplierName: {
        type: String,
        required: true,
        trim: true
    },
    supplierMaterials: {
        type: String,
        required: true
    }
})

module.exports = Supplier