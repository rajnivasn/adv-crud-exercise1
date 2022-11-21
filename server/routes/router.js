const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add supplier
 *  @method GET /add-supplier
 */
route.get('/add-supplier', services.add_supplier)
route.get('/add-supplierRate', services.add_supplierRate)

/**
 *  @description for update supplier
 *  @method GET /update-supplier
 */
route.get('/update-supplier', services.update_supplier)
route.get('/update-supplierRate', services.update_supplierRate)

// API
route.post('/api/suppliers', controller.create);
route.get('/api/suppliers', controller.find);
route.put('/api/suppliers/:supplierId', controller.update);
route.delete('/api/suppliers/:supplierId', controller.delete);

route.get('/api/supplierRates', controller.findRate);
route.post('/api/supplierRates', controller.createRate);
route.put('/api/supplierRates/:supplierRateId', controller.updateRate);
route.delete('/api/supplierRates/:supplierRateId', controller.deleteRate);

// Exercise 2 - APIs
route.get('/api/supplier/all', controller.findall);
route.get('/api/supplier/overlap', controller.findOverlap);


module.exports = route;
