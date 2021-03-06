const express = require('express')
const router = express.Router()
const model = require('../services/sequelizer')


router.get("/:id", (req, res) => {
    const productId = req.params.id

    model.Product.findAll({where:{id: productId}, raw: true })
        .then(data=>{
            res.render("edit.hbs", {
                user: data[0],
                whichPartial: () => {
                    return "header"
                }
            })})
        .catch(err=>console.log(err))
})

// обновление данных в БД
router.post("/",  (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const { name, age, id } = req.body

    model.Product.update({name:name, prise: age}, {where: {id: id} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router