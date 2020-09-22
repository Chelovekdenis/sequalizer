const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const model = require('../models/sequelizer')

const { forwardAuthenticated } = require('../config/auth')

router.get("/", forwardAuthenticated, (req, res) => {
    res.render('registration')
})

router.post('/', (req, res) => {
    const { username, password, password2 } = req.body
    let errors = []

    if (!username || !password || !password2)
        errors.push({ msg: 'Please enter all fields' })

    if (password !== password2)
        errors.push({ msg: 'Passwords do not match' })

    if (errors.length > 0)
        res.render('registration', {
            errors: errors
        })
    else
        model.User.findOne({where: {username: username}})
            .then(user => {
                if(user) {
                    errors.push({msg: 'Login already exists'})
                    res.render('registration', {
                        errors: errors
                    })
                } else
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err
                            model.User.create({ username: username, password: hash})
                                .then(() => res.redirect("/login"))
                                .catch(err=>console.log(err))
                        })
                    })
            }).catch(e => console.log(e))
})


module.exports = router