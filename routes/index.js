const express = require('express')
const router = express.Router()
const model = require('./sequelizer')

// User.findAll({raw:true, where:{name: "Bob"}}).then(users=>{
//   console.log(users)
// }).catch(err=>console.log(err))

// User.findOne({where: {name: "Tom"}})
//     .then(user=>{
//       if(!user) return;
//       console.log(user.name, user.age);
//     }).catch(err=>console.log(err));


router.get("/", (req, res) => {
    console.log()
    model.User.findAll({raw: true})
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
