const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')

// просто выводит форму для создания, но к тому же находит
// все компании в БД, чтобы придоставить список на выбор
router.get("/", async (req, res) => {
    const data = await model.Company.findAll({raw: true})
    res.render("create.hbs", {
        companies: data,
        whichPartial: () => {
            return "header"
        }
    })

})

// добавление данных
router.post("/", async (req, res) => {
    const { name, age, companyId } = req.body
    if (!name || !age || !companyId)
        res.redirect("/create")
    else {
        await model.Product.create({
            name: name, prise: age, companyId: companyId
        })
        res.redirect("/")
    }
})

module.exports = router