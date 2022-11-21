const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    supplierRateId : {
        type : Number,
        required: true
    },
    supplierId : {
        type : Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    rateStartDate : {
        type: Date,
        required: true
    },
    rateEndDate : Date,
    createdBy : {
        type: String,
        required: true
    },
    createdOn  : {
        type: Date,
        required: true
    }
})

const SupplierRatedb = mongoose.model('supplierRatedb', schema);

module.exports = SupplierRatedb;
