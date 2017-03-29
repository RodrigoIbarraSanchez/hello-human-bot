const Promise = require('bluebird')
module.exports = function(bp) {
    bp.middlewares.load()

    bp.hear({ type: 'postback', text: 'GET_STARTED' }, (event) => {

        const WELCOME_SENTENCES = [
            "Message 1",
            "Message 2",
            "Message 3"
        ]

        Promise.mapSeries(WELCOME_SENTENCES, message => {
            bp.messenger.sendText(event.user.id, message, { typing: true })
            return Promise.delay(4000)
        })

    })

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


    //Para que conteste cuando el usuario escribe cualquier cosa
    /*bp.hear({
        platform: 'facebook',
        type: 'message',
        text: /.+/i
    }, (event, next) => {
        bp.messenger.sendText(event.user.id, "Lo siento, no pude entenderte, puedes decirmelo de otra manera?")
    })*/
}