const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')

router.get("/", async (req, res) => {
    const data_users = await model.Product.findAll({raw: true})

    if (req.isAuthenticated() && req.user.username === "admin") {
        const data_companies  = await model.Company.findAll({raw: true})
        res.render("index.hbs", {
            users: data_users,
            companies: data_companies,
            admin: true
        })
    } else
        res.render("index.hbs", {
            users: data_users
        })
})

module.exports = router
