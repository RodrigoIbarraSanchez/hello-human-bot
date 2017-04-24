// DEPENDENCIAS
var express = require("express");
var router = express.Router();

var clasesRepository = require('../../domain/clasesRepository');

router.post('/clases', function(req, res) {

    //var data = req.body

    clasesRepository.createclase(function(clase) {
        res.json({
            status: "clase creado en BD",
            clase: clase
        })
        console.log('clase creada y guardada en la BD')
    }, function(err) {
        res.json({
            status: "Error al guardar clase",
            error: err
        })
    })

})

router.get('/clases', function(req, res) {

    clasesRepository.encuentraTodos(function(clases) {
        res.json({
            status: "Todos los clases encontrados",
            clases: clases
        })
    }, function(err) {
        res.json({
            status: "Error al obtener todos los clases",
            error: err
        })
    })
})

router.get('/clases/:id', function(req, res) {

    var id = req.params.id

    clasesRepository.encuentraMiclase(id, function(clase) {
        res.json({
            status: "clase encontrado",
            clase: clase
        })
    }, function(err) {
        res.json({
            status: "Error al obtener tu clase",
            error: err
        })
    })
})

router.delete('/clases/:id', function (req, res) {

    var id = req.params.id

    clasesRepository.borraMiclase(id, function() {
        res.json({
            status: "clase borrado"
        })
    }, function(err) {
        res.json({
            status: "Error al borrar tu clase",
            error: err
        })
    })

})



module.exports = router