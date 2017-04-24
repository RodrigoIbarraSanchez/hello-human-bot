var mongoose = require('mongoose');
var clasesEntity = require("./clasesEntity");


exports.createclase = function (event, onSuccess, onError) {

    var clase = new clasesEntity()

    clase.name = event
    //clase.start = 11
    //clase.ends = 1

    clase.save(function (err, clase) {
        if(err)
            onError(err)
        else
            onSuccess(clase)
    })
}

exports.encuentraTodos = function(onSuccess, onError) {

    clasesEntity.find({}, function(err, clases) {
        if (err)
            onError(err)
        else{

            /*
             var idclases = []
             for (var i = clases.length - 1; i >= 0; i--) {
             idclases.push(clases[i]._id)
             }
             onSuccess(idclases)
             */

            onSuccess(clases)
        }
    })
}

exports.encuentraMiclase = function(id, onSuccess, onError) {

    //onSuccess({message: "Esto si funciona"})

    clasesEntity.findOne({_id: id}, function(err, clase) {
        if (err)
            onError(err)
        else
            onSuccess(clase)
    })
}

exports.borraMiclase = function(id, onSuccess, onError) {

    this.encuentraMiclase(id, function(clase) {

        clasesEntity.remove({_id: id}, function (err){
            if (err)
                onError(err)
            else
                onSuccess()
        })

    }, onError)

}
