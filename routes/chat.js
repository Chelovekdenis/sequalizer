const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const model = require('../services/sequelizer')
const Sequelize = require("sequelize")
const Op = Sequelize.Op


router.get("/", ensureAuthenticated, async (req, res) => {

    let user = await model.User.findOne({where: {username: req.user.username}})
    let chats = await model.Relation.findAll({where: {userId: user.id}, raw: true})

    let companion_list = []

    let users_list = await model.User.findAll({raw: true})

    for (const item of chats) {
        let companion = await model.Relation.findOne({
            where: {
                chatId: item.chatId,
                userId:{
                    [Op.ne]: user.id
                }
            }
        })
        let companion_name = await model.User.findOne({where: {id: companion.userId}})
        let companionObj = {
            id: companion_name.id,
            username: companion_name.username,
            chatId: item.chatId
        }
        companion_list.push(companionObj)
    }

    users_list.forEach((item, i) =>{
        users_list[i] = {
            id: item.id,
            username: item.username
        }
    })

    let companion_list_id = companion_list.map(item => item.id)

    users_list = users_list
        .filter((item) => item.id !== user.id)
    users_list = users_list
        .filter((item) => companion_list_id.indexOf(item.id) === -1)

    res.render('chats_list', {
        companions: companion_list,
        users: users_list
    })
})


router.get("/new_chat/:id", ensureAuthenticated, async (req, res) => {

    const companion = await model.User.findOne({where: {id: req.params.id}})
    const user = await model.User.findOne({where: {username: req.user.username}})

    let date = new Date()

    let chat = await model.Chat.create({
        messages: [{
            date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
            time: `${date.getHours()}:${date.getMinutes()}`,
            name: "Welcome",
            text: "!"
        }]
    })

    await user.addChat(chat)
    await companion.addChat(chat)

    res.redirect(`/chat/${companion.id}.${chat.id}`)
})


let CHAT_ID = null


router.get("/:id.:chatId", ensureAuthenticated, async (req, res) => {
    const companion = await model.User.findOne({where: {id: req.params.id}})
    CHAT_ID = req.params.chatId
    res.render('chat', {
        name: req.user.username,
        companion: companion.username,
        chatId: req.params.chatId
    })

})


router.get("/get", ensureAuthenticated, (req, res) => {
    res.json({
        name: req.user.username,
        chatId: CHAT_ID
    })
})

module.exports = router
