const express = require('express')
const router = express.Router()
const model = require('../models/sequelizer')

// просто выводит форму для создания, но к тому же находит
// все компании в БД, чтобы придоставить список на выбор
router.get("/", (req, res) => {
    model.Company.findAll({raw: true})
        .then(data=>{
            res.render("create.hbs", {
                companies: data
            })})
        .catch(err=>console.log(err))
})

// добавление данных
router.post("/", (req, res) => {
    if(!req.body) return res.sendStatus(400)

    const { name, age, companyId } = req.body

    model.Product.create({ name: name, prise: age, companyId: companyId})
        .then(()=>{
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router