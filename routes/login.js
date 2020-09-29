const express = require('express')
const router = express.Router()
const passport = require('passport')
const { forwardAuthenticated } = require('../config/auth')

router.get("/", forwardAuthenticated, (req, res) => {
    res.render('login', {
        whichPartial: () => {
            return "header"
        }
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')

})

router.post('/', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
}))

module.exports = router


