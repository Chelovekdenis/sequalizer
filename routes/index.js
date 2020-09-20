const express = require('express')
const router = express.Router()
const model = require('../models/sequelizer')

router.get("/", (req, res) => {
        model.Product.findAll({raw: true})
            .then(data_users => {

                if (req.isAuthenticated() && req.user.username === "admin")
                    model.Company.findAll({raw: true})
                        .then(data_companies => {
                            res.render("index.hbs", {
                                users: data_users,
                                companies: data_companies
                            })
                        })
                        .catch(err => console.log(err))
                else
                    res.render("index.hbs", {
                        users: data_users
                    })
            })
            .catch(err => console.log(err))
})

module.exports = router
