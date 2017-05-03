// Dependencies
const Promise = require('bluebird');
var unirest = require('unirest');

module.exports = function(bp) {
    bp.middlewares.load()

    /*bp.hear({ type: 'postback', text: 'GET_STARTED' }, (event) => {

        const userId = event.user.id
        const type = 'image'
        const url = 'https://media.giphy.com/media/tZ9baZRizt3pu/giphy.gif'

        const WELCOME_SENTENCES = [
            "Soy un asistente virtual y estoy aquí para ayudarte.",
            "No soy humano, pero puedo ayudarte a hacer tu vida más productiva.",
            "Se que tienes cosas muy importantes por hacer, así que por eso estoy aquí para ayudarte en lo que sea que necesites.",
            "Puedo leerte, así que puedes escribirme para decirme tus actividades, yo me encargaré de que aproveches tu tiempo libre.",
            "También puedes escribirme si necesitas que te recuerde algo y yo te escribiré de vuelta para recordarte."
        ]

        Promise.mapSeries(WELCOME_SENTENCES, message => {
            bp.messenger.sendText(event.user.id, message, { typing: true })
            return Promise.delay(7500)
        })

    })*/
    bp.hear({ type: 'postback', text: 'GET_STARTED' }, (event) => {

        const WELCOME_SENTENCES = [
            function(){
                bp.messenger.sendText(event.user.id, "Soy un asistente virtual y estoy aquí para ayudarte.", { typing: true })
            },
            function(){
                bp.messenger.sendAttachment(event.user.id, 'image', 'https://media.giphy.com/media/tZ9baZRizt3pu/giphy.gif')
            },
            function(){
                bp.messenger.sendText(event.user.id, "No soy humano, pero puedo ayudarte a hacer tu vida más productiva.", { typing: true })
            },
            function () {
                bp.messenger.sendText(event.user.id, "Se que tienes cosas muy importantes por hacer, así que por eso estoy aquí para ayudarte en lo que sea que necesites.", { typing:true })
            },
            function () {
                bp.messenger.sendText(event.user.id, "Puedo leerte, así que puedes escribirme para decirme tus actividades, yo me encargaré de que aproveches tu tiempo libre.", { typing:true })
            },
            function () {
                bp.messenger.sendAttachment(event.user.id, 'image', 'https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif')
            },
            function () {
                bp.messenger.sendText(event.user.id, "También puedes escribirme si necesitas que te recuerde algo y yo te escribiré de vuelta para recordarte.")
            },
            function () {
                bp.messenger.sendText(event.user.id, "¡Muy bien, empecemos!")
            },
            function () {
                bp.messenger.sendText(event.user.id, "Cuál es tu primer clase y a qué hora? Ej. Programación - 1:00pm")
            }
        ]

        Promise.mapSeries(WELCOME_SENTENCES, messageFunction => {
            messageFunction();
            return Promise.delay(7500)
        })

    })
    // Guardar una imagen
    /*bp.hear({ platform: 'facebook', type: 'postback', text: 'GET_STARTED' }, (event, next) => {

        // Send a reusable image at Get_Started postback
        bp.messenger.sendAttachment(
            event.user.id,
            'image',
            'https://images.unsplash.com/photo-1433162653888-a571db5ccccf',
            { isReusable: true }
            ).then(res => {
                bp.db.kvs.set('attachHelloWorld', res.attachment_id);
            });

        })

            bp.hear({ type: 'message', text: /.+/i }, (event, next) => {
                bp.messenger.sendText(event.user.id, 'hmm.. how about the same image?');

            // Send the reusable image
            var attachHelloWorld = bp.db.kvs.get('attachHelloWorld');

            bp.messenger.sendAttachment(
                event.user.id,
                'image',
                null,
                { attachment_id: attachHelloWorld }
            );
        })*/

    //Mostramos el Horario por medio de la palabra "Horario"
    bp.hear(/horario/i, (event, next) => { // We use a regex instead of a hardcoded string
        const userId = event.user.id
        const type = 'image'
        const url = 'http://www.calendarlabs.com/templates/2017/i/2017-monthly-calendar-pdf-01.png'

        bp.messenger.sendAttachment(userId, type, url)
    })
    bp.hear(/Que puedes hacer por mi/i, (event, next) => {
        const userId = event.user.id
        const text = "Puedo:"
        const options = {
            quick_replies: [
                {
                    content_type: "text",
                    title: "opción uno",
                    payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_OPTION_1'
                },
                {
                    content_type:"text",
                    title:"opción uno",
                    payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_OPTION_2'
                },
                {
                    content_type:"text",
                    title:"opción tres",
                    payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_OPTION_3'
                }
            ],
            typing: true,
            waitRead: true
        }

        bp.messenger.sendText(userId, text, options)
        .then(() => {
            bp.hear({platform: 'facebook', type: 'postback', text: 'DEVELOPER_DEFINED_PAYLOAD_FOR_OPTION_1'}, (event) => {
                bp.messenger.sendText(event.user.id, 'Elegiste la opción 1!');
            });
    })



    })
    bp.hear(/informacion/i, (event, next) => { // We use a regex instead of a hardcoded string
        const userId = event.user.id
        const payload = {
            template_type: "button",
            text: "Ya viste nuestro sitio web?",
            buttons: [
                {
                    type: "web_url",
                    url: "www.rodrigoibarrasanchez.xyz",
                    title: "Ir a Sitio Web"
                }
            ]
        }

        bp.messenger.sendTemplate(userId, payload, { typing: 2000 })
    })
    //Mostramos el Horario por medio de la palabra "Horario"
    /*bp.hear(/tutorial/i, (event, next) => { // We use a regex instead of a hardcoded string
        const userId = event.user.id
        const type = 'video'
        const url = 'https://player.vimeo.com/e6060004-f2a7-4cf1-9c20-e8f81cff1fbb'

        bp.messenger.sendAttachment(userId, type, url)
    })*/
    //Mostramos un gif por medio de la palabra "ass"
    bp.hear(/gif/i, (event, next) => { // We use a regex instead of a hardcoded string
        const userId = event.user.id
        const type = 'image'
        const url = 'https://media.giphy.com/media/tZ9baZRizt3pu/giphy.gif'

        bp.messenger.sendAttachment(userId, type, url)
    })

    bp.hear(/imagen/i, (event, next) => {
        const userId = event.user.id
        const type = 'image'
        const url = 'http://static.tvazteca.com/imagenes/2015/22/hamburguesa-1984023.jpg'

        bp.messenger.sendAttachment(userId, type, url)
    })

    bp.hear({ type: 'message', text: /.+/i }, (event, next) => {
        // I'll be called always.. in all messages
        var name = event.raw.message.text;
        exports.name = name;

        console.log("El mensaje: "+event.raw.message.text);

        unirest.post('https://hello-human-bot.herokuapp.com/api/clases/')
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send({ "className": event.raw.message.text })
            .end(function (response) {
                console.log(response.body);
        });

    })
    /*bp.hear({ type: 'message', text: /recuerdame/i }, (event, next) => {
        // I'll be called always.. in all messages

        console.log("Recordar: "+event.raw.message.text);

        unirest.post('http://megbot.wtf/api')
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send({ "task": event.raw.message.text})
            .end(function (response) {
                console.log(response.body);
            });

    })*/

    /*bp.hear({ type: 'message', text: /.+/i }, (event, next) => {
        // I'll be called always.. in all messages

        console.log("El mensaje: "+event.raw.message.text);

        unirest.post('http://megbot.wtf/api')
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send({ "firstName": event.raw.message.text, "lastName": "Lopez", "email": "shrek@gmail.com" })
            .end(function (response) {
                console.log(response.body);
            });

    })*/

    //Para que conteste cuando el usuario escribe cualquier cosa
    /*bp.hear({
        platform: 'facebook',
        type: 'message',
        text: /.+/i
    }, (event, next) => {
        bp.messenger.sendText(event.user.id, "Lo siento, no pude entenderte, puedes decirmelo de otra manera?")
    })*/
}