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
                let newElems = $("<ui class=\"chat_ui\"></ui>")
                    .append(`<li><span class="companion_name">${item.name}</span><span class="dateandtime">${item.time} ${item.date}</span></li>`)
                    .append(`<li>${item.text}</li><br>`)

                messages.append(newElems)
                // messages.append($('<ui style="padding-left: 50%">'))
                // messages.append($('<li>')
                //     .text(`${item.name}: ${item.text}---${item.time}---${item.date}`))
                // messages.append($('</ui>'))
                // messages.append($('<ui style="padding-left: 50%">')
                //     .text(`<li><span class="companion_name">${item.name}</span><span class="dateandtime">${item.time} ${item.date}</span></li><li>${item.text}</li><br>`))
                // messages.append($('<li style="padding-left: 50%">')
                //     .text(`${item.name}: ${item.text}---${item.time}---${item.date}`))
            } else {
                let newElems = $("<ui></ui>")
                    .append(`<li><span class="companion_name">${item.name}</span><span class="dateandtime">${item.time} ${item.date}</span></li>`)
                    .append(`<li>${item.text}</li><br>`)
                messages.append(newElems)
            }
                // .text(`<li><span class="companion_name">${item.name}</span><span class="dateandtime">${item.time} ${item.date}</span></li><li>${item.text}</li><br>`))
                // messages.append($('<li>')
                //     .text(`${item.name}: ${item.text}---${item.time}---${item.date}`))

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

    let newElems = $("<ui class=\"chat_ui\"></ui>")
        .append(`<li><span class="companion_name">${msg.name}</span><span class="dateandtime">${msg.time} ${msg.date}</span></li>`)
        .append(`<li>${msg.text}</li><br>`)

    messages.append(newElems)

    socket.emit('chat message', msg)
    m.val('')
    return false
})

socket.on('chat message client', (msg) => {
    let newElems = $("<ui></ui>")
        .append(`<li><span class="companion_name">${msg.name}</span><span class="dateandtime">${msg.time} ${msg.date}</span></li>`)
        .append(`<li>${msg.text}</li><br>`)

    messages.append(newElems)
})
