const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    supplierId : {
        type : Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    address    : String,
    createdBy  : {
        type: String,
        required: true
    },
    createdOn  : {
        type: Date,
        required: true
    }
})

const Supplierdb = mongoose.model('supplierdb', schema);

module.exports = Supplierdb;
