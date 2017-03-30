var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Curso = new Schema({
    nombre : String,
    content : String,
    updated_at : Date
});

mongoose.model('curso', Curso);
mongoose.connect('mongodb://127.0.0.1/cursos');