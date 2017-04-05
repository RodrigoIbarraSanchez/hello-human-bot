// Dependencies
var express = require('express')
var morgan = require("morgan")
var path = require("path")
//var Client = require('node-rest-client').Client;
var unirest = require('unirest');

// Settings
var app = express()
app.set('port', 8000)
app.set('view engine', 'pug')
app.use(morgan("dev"))


// Public folder
app.use(express.static(path.join(__dirname, "../public")))

/*var client = new Client();

// direct way
client.get("http://megbot.wtf/api", function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response)
});
// set content-type header and data as json in args parameter
var args = {
    data: { test: "hello" },
    headers: { "Content-Type": "application/json" }
};

client.post("http://megbot.wtf/api", args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});*/


/*app.use("/", function (req, res) {
    res.send(jsonContent.usuario_uno.first_name);
})*/
app.get('/', function (req, res) {
    res.render(
        'index',
        {
            title: 'Dashboard',
            nombre_usuario: jsonContent.usuario_uno.first_name,
            foto_perfil: jsonContent.usuario_uno.profile_pic,
            nombre: jsonContent.usuario_uno.first_name,
            apellido: " " + jsonContent.usuario_uno.last_name
        })
})
app.get('/horario', function (req, res) {
    res.render(
        'horario',
        {
            title: 'Horario',
            nombre_usuario: jsonContent.usuario_uno.first_name,
            foto_perfil: jsonContent.usuario_uno.profile_pic,
            nombre: jsonContent.usuario_uno.first_name,
            apellido: " " + jsonContent.usuario_uno.last_name
        })
})
app.get('/todos', function (req, res) {
    res.render(
        'todos',
        {
            title: "ToDo's",
            nombre_usuario: jsonContent.usuario_uno.first_name,
            foto_perfil: jsonContent.usuario_uno.profile_pic,
            nombre: jsonContent.usuario_uno.first_name,
            apellido: " " + jsonContent.usuario_uno.last_name
        })
})
app.get('/goals', function (req, res) {
    res.render(
        'goals',
        {
            title: 'Goals',
            nombre_usuario: jsonContent.usuario_uno.first_name,
            foto_perfil: jsonContent.usuario_uno.profile_pic,
            nombre: jsonContent.usuario_uno.first_name,
            apellido: " " + jsonContent.usuario_uno.last_name
        })
})

// Define JSON File
var fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("data/botpress-messenger.profiles.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
//res.send("jsonContent:", jsonContent.usuario_uno.first_name);

/*unirest.post('http://megbot.wtf/api')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({ "firstName": "otroNombe", "lastName": "otroApellio", "email": "otomail@gmail.com" })
    .end(function (response) {
        console.log(response.body);
    });*/

// Error 404
app.use(function(req, res, next){
    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
        return res.send("Página no encontrada")
    }

    // respond with json
    if (req.accepts('json')) {
        return res.json({ error: 'Recurso no encontrado' })
    }

    // default to plain-text. send()
    return res.type('txt').send('Not found')
})

// Start Server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})