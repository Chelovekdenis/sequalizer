const express = require('express')
const router = express.Router()
const model = require('./sequelizer')

// просто выводит форму для создания, но к тому же находит
// все компании в БД, чтобы придоставить список на выбор
router.get("/", (req, res) => {
    model.Company.findAll({raw: true})
        .then(data=>{
            res.render("create.hbs", {
                companies: data
            })})
        .catch(err=>console.log(err))
    // res.render("create.hbs")
})

// добавление данных
router.post("/", (req, res) => {

    if(!req.body) return res.sendStatus(400)

    const productName = req.body.name
    const productAge = req.body.age
    const CompanyId = req.body.companyId
    model.Product.create({ name: productName, prise: productAge, companyId: CompanyId})
        .then(()=>{
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router