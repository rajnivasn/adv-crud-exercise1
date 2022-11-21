var Supplierdb = require('../model/supplier');
var SupplierRatedb = require('../model/supplierRate');


// create and save new supplier
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new supplier
    const supplier = new Supplierdb({
        supplierId : req.body.supplierId,
        name : req.body.name,
        address : req.body.address,
        createdBy : req.body.createdBy,
        createdOn : req.body.createdOn
    })

    // new supplierRate
    const supplierRate = new SupplierRatedb({
        supplierRateId : req.body.supplierRateId,
        supplierId : req.body.supplierId,
        rate : req.body.rate,
        rateStartDate : req.body.rateStartDate,
        rateEndDate : req.body.rateEndDate,
        createdBy : req.body.createdBy,
        createdOn : req.body.createdOn
    })

    // save supplier in the database
    supplier
        .save(supplier)
        .then(data => {
            //res.send(data)
            res.redirect('/add-supplier');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.createRate = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }
    console.log(req.body);
    // new supplierRate
    const supplierRate = new SupplierRatedb({
        supplierRateId : req.body.supplierRateId,
        supplierId : req.body.supplierId,
        rate : req.body.rate,
        rateStartDate : req.body.rateStartDate,
        rateEndDate : req.body.rateEndDate,
        createdBy : req.body.createdBy,
        createdOn : req.body.createdOn
    })

    // save supplierRate in the database
    supplierRate
        .save(supplierRate)
        .then(data => {
            //res.send(data)
            res.redirect('/add-supplierRate');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all suppliers/ retrive and return a single supplier
exports.find = (req, res)=>{

    if(req.query.supplierId){

        const id = req.query.supplierId;

        //Supplierdb.findOne(id)
        Supplierdb.findOne({"supplierId" : id})
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found supplier with id "+ id})
                }else{
                    console.log(data)
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving supplier with id " + id})
            })

    }else{
        Supplierdb.find()
            .then(supplier => {
              const supplierData = [];
              const supplierIdMax = Math.max(...supplier.map(o => o.supplierId));
              supplierData.push(supplier)
              supplierData.push(supplierIdMax)
              SupplierRatedb.find()
                      .then(supplierRate => {
                        const supplierRateIdMax = Math.max(...supplierRate.map(o => o.supplierRateId));
                        supplierData.push(supplierRate)
                        supplierData.push(supplierRateIdMax)

                        res.send(supplierData)
                    })
                      .catch(err => {
                          res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
                      })
          })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
            })


    }
}

exports.findRate = (req, res)=>{

    if(req.query.supplierRateId){

        const id = req.query.supplierRateId;

        //Supplierdb.findOne(id)
        SupplierRatedb.findOne({"supplierRateId" : id})
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found supplierRate with id "+ id})
                }else{
                    console.log(data)
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving supplierRate with id " + id})
            })

} }

// Update a new identified supplier by id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.supplierId;
    Supplierdb.findOneAndUpdate({"supplierId" : id}, req.body, {new: true } )
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update supplier with ${id}. Supplier not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({ message : "Error Updating Supplier information"})
        })
}

// Update a supplier Rate by id
exports.updateRate = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.supplierRateId;
    SupplierRatedb.findOneAndUpdate({"supplierRateId" : id}, req.body, {new: true } )
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update supplier rate with ${id}. Supplier Rate not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({ message : "Error Updating Supplier Rate information"})
        })
}

// Delete a Supplier with specified supplier id in the request
exports.delete = (req, res)=>{
    const id = req.params.supplierId;

    Supplierdb.findOneAndDelete({"supplierId" : id})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Supplier was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Supplier with id=" + id
            });
        });
}

exports.deleteRate = (req, res)=>{
    const id = req.params.supplierRateId;

    SupplierRatedb.findOneAndDelete({"supplierRateId" : id})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with SupplerRateid ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Supplier rate was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Supplier rate with id=" + id
            });
        });
}

// retrieve and return all suppliers/ retrive and return a single supplier
exports.findall = (req, res)=>{

    if(req.query.supplierId){

        const id = req.query.supplierId;

        //Supplierdb.findOne(id)
        Supplierdb.find({"supplierId" : id})
            .then(supplier =>{
                if(!supplier){
                    res.status(404).send({ message : "Not found supplier with id "+ id})
                }else{
                    console.log(data)
                    const supplierAllData = [];
                    supplierAllData.push(supplier)
                    SupplierRatedb.find({"supplierId" : id})
                            .then(supplierRate => {
                              supplierallData.push(supplierRate)
                              res.send(supplierAllData)
                            })
                            .catch(err => {
                                res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
                            })
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving supplier with id " + id})
            })

    }else{
        Supplierdb.find()
            .then(supplier => {
              const supplierAllData = [];
              supplierAllData.push(supplier)
              SupplierRatedb.find()
                      .then(supplierRate => {
                        supplierAllData.push(supplierRate)
                        res.send(supplierAllData)
                    })
                      .catch(err => {
                          res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
                      })
          })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
            })


    }
}

exports.findOverlap = (req, res)=>{

    if(req.query.supplierId){

        const id = req.query.supplierId;

        //Supplierdb.findOne(id)
        SupplierRatedb.find({"supplierId" : id, "rateEndDate" : null})
              .then(supplierRate => {
                const supplierOverlapData = [];
                const tempOverlap = [];
                supplierRate.forEach(item => {
                let resObj = tempOverlap.find(resObj => resObj.supplierId === item.supplierId);
                resObj ? resObj.Count++ : tempOverlap.push({'supplierId':item.supplierId, 'Count': 1});
                 });
                 console.log(tempOverlap);
                 const supplierOverlap = tempOverlap.filter(o => o.Count > 1)
                 console.log(supplierOverlap);
                 supplierOverlap.map(o => {
                   supplierRate.filter(e => {
                     if (e.supplierId === o.supplierId ) {
                       supplierOverlapData.push(e) }
                     })
                   })

                res.send(supplierOverlapData)
               })
              .catch(err => {
               res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
            })

    }else{
        SupplierRatedb.find( {"rateEndDate" : null } )
         .then(supplierRate => {
           const supplierOverlapData = [];
           const tempOverlap = [];
           supplierRate.forEach(item => {
           let resObj = tempOverlap.find(resObj => resObj.supplierId === item.supplierId);
           resObj ? resObj.Count++ : tempOverlap.push({'supplierId':item.supplierId, 'Count': 1});
            });
            console.log(tempOverlap);
            const supplierOverlap = tempOverlap.filter(o => o.Count > 1)
            console.log(supplierOverlap);
            supplierOverlap.map(o => {
              supplierRate.filter(e => {
                if (e.supplierId === o.supplierId ) {
                  supplierOverlapData.push(e) }
                })
              })

           res.send(supplierOverlapData)
          })
        .catch(err => {
         res.status(500).send({ message : err.message || "Error Occurred while retriving supplier information" })
        })
    }
}
