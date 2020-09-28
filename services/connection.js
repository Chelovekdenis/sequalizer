const model = require('../services/sequelizer')

module.exports =  io => {
    io.on('connection', socket => {
        console.log("connect")

        socket.on('chat message', async (msg) => {
            let result = await model.Chat.findOne({where: {id: socket.chatId}})
            let date = new Date()

            msg.time = `${date.getHours()}:${date.getMinutes()}`
            msg.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

            result.messages.push(msg)
            await model.Chat.update({messages: result.messages}, {where: {id: socket.chatId} })

            socket.broadcast.emit('chat message client', msg)
        })

        socket.on('login', async (data) => {
            socket.username = data.name
            socket.chatId = data.chatId

            let chat_history = await model.Chat.findOne({where: {id: data.chatId}})

            socket.emit('restoration messages', chat_history)
        })

        socket.on('disconnect', () => {
            console.log("disconnect -> " + socket.username)
        })
    })
}