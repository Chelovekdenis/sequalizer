const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const model = require('../services/sequelizer')
const checkingRegistrationData = require("./checkingRegistrationData");

const {forwardAuthenticated} = require('../config/auth')

router.get("/", forwardAuthenticated, (req, res) => {
    res.render('registration', {
        whichPartial: () => {
            return "header"
        }
    })
})

router.post('/', async (req, res) => {
    const {username, password, password2} = req.body
    let data = await checkingRegistrationData(username, password, password2);
    let errors = data[0]
    let dataIsCorrect = data[1]

    if (!dataIsCorrect)
        res.render('registration', {
            errors: errors,
            whichPartial: () => {
                return "header"
            }
        })
    else
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err

                await model.User.create({
                    username: username, password: hash
                })
                res.redirect("/login")
            })
        })
})


module.exports = router
