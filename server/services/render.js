const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/supplier
    axios.get('http://localhost:4000/api/suppliers')
        .then(function(response){
            res.render('index', { suppliers : response.data[0], supplierRates : response.data[2]   });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_supplier = (req, res) =>{
  axios.get('http://localhost:4000/api/suppliers')
      .then(function(response) {
        console.log(response.data)
    res.render('add_supplier' , {suppliers : response.data[0], supplierIdMax : response.data[1] });
  })
  .catch(err => {
    res.send(err);
  })
}

exports.add_supplierRate = (req, res) =>{
  axios.get('http://localhost:4000/api/suppliers')
      .then(function(response) {
    res.render('add_supplierRate' , {supplierRates : response.data[2], supplierRateIdMax : response.data[3] });
  })
  .catch(err => {
    res.send(err);
  })
}

exports.update_supplier = (req, res) =>{
    axios.get('http://localhost:4000/api/suppliers', { params : { supplierId : req.query.supplierId}})
        .then(function(supplierdata){
            res.render("update_supplier", { supplier : supplierdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_supplierRate = (req, res) =>{
    axios.get('http://localhost:4000/api/supplierRates', { params : { supplierRateId : req.query.supplierRateId}})
        .then(function(supplierRatedata){
            console.log(supplierRatedata.data);
            res.render("update_supplierRate", { supplierRate : supplierRatedata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
