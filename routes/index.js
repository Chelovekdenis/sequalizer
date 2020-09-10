const express = require('express')
const router = express.Router()
const model = require('./sequelizer')

router.get("/", (req, res) => {
    console.log()
    model.Product.findAll({raw: true})
      .then(data_users=>{
          model.Company.findAll({raw: true})
              .then(data_companies=>{
                  // console.log(data.concat(data2))
                res.render("index.hbs", {
                    users: data_users,
                    companies: data_companies
              })})
              .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
})

module.exports = router
