const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get("/", ensureAuthenticated,(req, res) => {
    res.render('dashboard', {
        name: req.user.username
    })
})

module.exports = router