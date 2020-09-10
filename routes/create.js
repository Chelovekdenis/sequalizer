const express = require('express')
const router = express.Router()
const model = require('./sequelizer')


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

    const userName = req.body.name
    const userAge = req.body.age
    const CompanyId = req.body.companyId
    model.User.create({ name: userName, prise: userAge, companyId: CompanyId})
        .then(()=>{
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router