const express = require('express')
const model = require("../services/sequelizer");
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get("/", ensureAuthenticated, async (req, res) => {
    let user = await model.User.findOne({where: {username: req.user.username}})
    let orders = await model.Order.findAll({where: {userId: user.id}, raw: true})

    res.render('dashboard', {
        username: req.user.username,
        orders: orders,
        whichPartial: () => {
            return "header_authenticated"
        }
    })
})

router.post("/:id", ensureAuthenticated, async (req, res) => {
    // let user = await model.User.findOne({where: {username: req.user.username}})
    let order = await model.Order.destroy({where: {id:req.params.id}, raw: true})
    res.redirect(`/dashboard`)
})

module.exports = router
