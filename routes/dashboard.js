const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get("/", ensureAuthenticated,(req, res) => {
    res.render('dashboard', {
        username: req.user.username,
        whichPartial: () => {
            return "header_authenticated"
        }
    })
})

module.exports = router