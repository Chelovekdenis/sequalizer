const express = require('express')
const router = express.Router()
const model = require('./sequelizer')

router.get("/:id", (req, res) => {
    const userid = req.params.id
    model.User.findAll({where:{id: userid}, raw: true })
        .then(data=>{
            res.render("edit.hbs", {
                user: data[0]
            })})
        .catch(err=>console.log(err))
})

// обновление данных в БД
router.post("/",  (req, res) => {

    if(!req.body) return res.sendStatus(400)

    const userName = req.body.name
    const userAge = req.body.age
    const userId = req.body.id

    model.User.update({name:userName, prise: userAge}, {where: {id: userId} })
        .then(() => {
            res.redirect("/")})
        .catch(err=>console.log(err))
})

module.exports = router