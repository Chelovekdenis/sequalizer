let express = require('express')
let router = express.Router()


router.get('/', (req, res) => {
  res.render("users.hbs")
})

module.exports = router
