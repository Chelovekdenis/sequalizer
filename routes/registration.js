const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const model = require('../services/sequelizer')

const { forwardAuthenticated } = require('../config/auth')

router.get("/", forwardAuthenticated, (req, res) => {
    res.render('registration', {
        whichPartial: () => {
            return "header"
        }
    })
})

router.post('/', async (req, res) => {
    const { username, password, password2 } = req.body
    let errors = []

    if (!username || !password || !password2)
        errors.push({ msg: 'Please enter all fields' })

    if (password !== password2)
        errors.push({ msg: 'Passwords do not match' })

    if (errors.length > 0)
        res.render('registration', {
            errors: errors,
            whichPartial: () => {
                return "header"
            }
        })

    else {
        const user = await model.User.findOne({where: {username: username}})
        if(user) {
            errors.push({msg: 'Login already exists'})
            res.render('registration', {
                errors: errors,
                whichPartial: () => {
                    return "header"
                }
            })
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err

                await model.User.create({
                    username: username, password: hash
                })
                res.redirect("/login")
            })
        })
    }
})


module.exports = router