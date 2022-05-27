const express = require('express')
const model = require("../services/sequelizer");
const router = express.Router()

router.get("/", (req, res) => {
    res.render('order.hbs', {
        whichPartial: () => {
            return "header"
        }
    })
})


router.get("/:id", async (req, res) => {
    const order = await model.Order.findOne({where: {id: req.params.id}})

    res.render('order', {
        userId: order.userId,
        logo: order.logo,
        product_name: order.product_name,
        price: order.price,
        description: order.description,
        address: order.address,
        last_login_time: order.last_login_time,
        phone_number: order.phone_number,
        whichPartial: () => {
            return "header"
        }
    })
})

module.exports = router

