const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')
const {Op} = require("sequelize");


router.get("/", async (req, res) => {
    let orders_list = await model.Order.findAll({raw: true})

    if (req.isAuthenticated())
        res.render("index.hbs", {
            orders: orders_list,
            whichPartial: () => {
                return "header_authenticated"
            }
        })
    else
        res.render("index.hbs", {
            orders: orders_list,
            whichPartial: () => {
                return "header"
            }
        })
})

router.post('/', async (req, res) => {
    const {desired} = req.body
    const orders_list = await model.Order.findAll({where: {product_name: {[Op.regexp]: '.*' + desired + '.*',  }}, raw: true})

    if (req.isAuthenticated())
        res.render("index.hbs", {
            orders: orders_list,
            whichPartial: () => {
                return "header_authenticated"
            }
        })
    else
        res.render("index.hbs", {
            orders: orders_list,
            whichPartial: () => {
                return "header"
            }
        })

})

module.exports = router
