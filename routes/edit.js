const express = require('express')
const router = express.Router()
const model = require('./sequelizer')


router.get("/:id", (req, res) => {
    const productId = req.params.id
    model.Product.findAll({where:{id: productId}, raw: true })
        .then(data=>{
            res.render("edit.hbs", {
                user: data[0]
            })})
        .catch(err=>console.log(err))
})

// обновление данных в БД
router.post("/",  (req, res) => {

    if(!req.body) return res.sendStatus(400)

    const productName = req.body.name
    const productAge = req.body.age
    const productId = req.body.id

    model.Product.update({name:productName, prise: productAge}, {where: {id: productId} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router