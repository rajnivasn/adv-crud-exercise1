$("#add_supplier").submit(function(event){
    alert("Supplier added Successfully!");
})

$("#add_supplierRate").submit(function(event){
    alert("Supplier Rate added Successfully!");
})

$("#update_supplier").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    data.supplierId = parseInt(data.supplierId);
    console.log(data);

    var request = {
        "url" : `http://localhost:4000/api/suppliers/${data.supplierId}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

$("#update_supplierRate").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    data.supplierRateId = parseInt(data.supplierRateId);
    console.log(data);

    var request = {
        "url" : `http://localhost:4000/api/supplierRates/${data.supplierRateId}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.supplier");
    $ondelete.click(function(){
        var supplierId = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:4000/api/suppliers/${supplierId}`,
            "method" : "DELETE"
        }

        if(confirm("Do you want to delete this supplier record?")){
            $.ajax(request).done(function(response){
                alert("Supplier Deleted Successfully!");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.supplierRate");
    $ondelete.click(function(){
        var supplierRateId = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:4000/api/supplierRates/${supplierRateId}`,
            "method" : "DELETE"
        }

        if(confirm("Do you want to delete this Supplier Rate?")){
            $.ajax(request).done(function(response){
                alert("Supplier Rate Deleted Successfully!");
                location.reload();
            })
        }

    })
}
