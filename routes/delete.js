const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')

// удаление продукта
router.post("/:id", (req, res) => {
    const productId = req.params.id

    model.Product.destroy({where: {id: productId} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

// удаление компании
router.post("/company/:id", (req, res) => {
    const companyId = req.params.id

    model.Company.destroy({where: {id: companyId} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router