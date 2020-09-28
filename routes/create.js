const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')

// просто выводит форму для создания, но к тому же находит
// все компании в БД, чтобы придоставить список на выбор
router.get("/", async (req, res) => {
    const data = await model.Company.findAll({raw: true})
    res.render("create.hbs", {
        companies: data
    })

})

// добавление данных
router.post("/", async (req, res) => {
    if(!req.body) return res.sendStatus(400)
    const { name, age, companyId } = req.body
    await model.Product.create({
        name: name, prise: age, companyId: companyId
    })
    res.redirect("/")
})

module.exports = router