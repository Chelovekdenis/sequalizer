const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')


router.get("/", async (req, res) => {
    const data_users = await model.Product.findAll({raw: true})
    if (req.isAuthenticated()){
        if (req.user.username === "admin") {
            const data_companies  = await model.Company.findAll({raw: true})
            res.render("index.hbs", {
                users: data_users,
                companies: data_companies,
                admin: true,
                username: req.user.username,
                whichPartial: () => {
                    return "header_authenticated"
                }
            })
        }
        res.render("index.hbs", {
            users: data_users,
            username: req.user.username,
            whichPartial: () => {
                return "header_authenticated"
            }
        })
    } else
        res.render("index.hbs", {
            users: data_users,
            whichPartial: () => {
                return "header"
            }
        })
})

module.exports = router
