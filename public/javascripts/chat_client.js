let user_data = ""
// const socket = io.connect("http://localhost:3000")
const socket = io()

let m = $('#m')
let messages = $('#messages')


async function takeInfo() {
    let privet = await fetch('/chat/get')
    user_data = await privet.json()

    socket.emit('login', user_data)

    await socket.on('restoration messages', (chat_history) => {
        for (const item of chat_history.messages) {
            if (user_data.name === item.name) {
                messages.append($('<li style="padding-left: 50%">')
                    .text(`${item.name}: ${item.text}---${item.time}---${item.date}`))
            } else
                messages.append($('<li>')
                    .text(`${item.name}: ${item.text}---${item.time}---${item.date}`))

        }
    })
}

takeInfo()

$('form').on("submit", (e) => {
    e.preventDefault() // prevents page reloading

    let date = new Date()

    let msg = {
        name: user_data.name,
        text: m.val(),
        time: `${date.getHours()}:${date.getMinutes()}`,
        date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

    messages.append($('<li style="padding-left: 50%;">')
        .text(`${msg.name}: ${msg.text}---${msg.time}---${msg.date}`))

    socket.emit('chat message', msg)
    m.val('')
    return false
})

socket.on('chat message client', (msg) => {
    messages.append($('<li>')
        .text(`${msg.name}: ${msg.text}---${msg.time}---${msg.date}`))
})
