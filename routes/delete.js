const express = require('express')
const router = express.Router()
const model = require('./sequelizer')

router.post("/:id", (req, res) => {
    const userid = req.params.id

    model.User.destroy({where: {id: userid} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

router.post("/company/:id", (req, res) => {
    const companyId = req.params.id

    model.Company.destroy({where: {id: companyId} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router