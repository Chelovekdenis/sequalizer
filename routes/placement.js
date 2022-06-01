const express = require('express')
const router = express.Router()
const model = require("../services/sequelizer");
const {ensureAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated, (req, res) => {
    res.render('placement.hbs', {
        username: req.user.username,
        whichPartial: () => {
            return "header_authenticated"
        }
    })
})

// Еще в модель добавить id человек который разместил
router.post("/", ensureAuthenticated, async (req, res) => {
    const {logo, product_name, price, description, address, phone_number} = req.body
    const user = await model.User.findOne({where: {username: req.user.username}})

    await model.Order.create({
        userId: user.id,
        logo: logo,
        product_name: product_name,
        price: price,
        description: description,
        address: address,
        phone_number: phone_number,
        last_login_time: new Date(Date.now() + 10800000).toISOString().slice(0, 19).replace('T', ' ')
    })
    res.redirect("/")
})


module.exports = router

