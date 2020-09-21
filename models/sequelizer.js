const Sequelize = require("sequelize")
const {database, username, password} = require('../config/database')

const sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
})

const Product = require("./Product")(sequelize)
const Company = require("./Company")(sequelize)
const User = require("./User")(sequelize)

Company.hasMany(Product, {onDelete: "cascade"})

// !!! Убрать force: true, если не нужно создавать всегда заного базу данных
// sequelize.sync({force: true}).then(()=>{
//     console.log("Сервер ожидает подключения...")
//     //создаем одну компанию
//     Company.create({ name: "Apple"}).then(res=>{
//
//         // получаем id созданной компании
//         const compId = res.id
//         //создаем пару товаров для этой компании
//         Product.create({name:"iPhone XS", prise: 12, companyId: compId}).catch(err=>console.log(err))
//         Product.create({name:"iPhone XR", prise: 13, companyId: compId}).catch(err=>console.log(err))
//
//     }).catch(err=>console.log(err))
//
//     //создаем вторую компанию
//     Company.create({ name: "OnePlus"}).then(res=>{
//
//         // получаем id созданной компании
//         const compId = res.id
//         //создаем пару товаров для этой компании
//         Product.create({name:"OnePlus 8", prise: 8, companyId: compId}).catch(err=>console.log(err))
//         Product.create({name:"OnePlus 8 Pro", prise: 9, companyId: compId}).catch(err=>console.log(err))
//
//     }).catch(err=>console.log(err))
//
//     User.create({username: "admin", password: "123"})
//         .catch(err => console.log(err))
//     User.create({username: "chel", password: "as3"})
//         .catch(err => console.log(err))
// }).catch(err=>console.log(err))


module.exports.Product = Product
module.exports.Company = Company
module.exports.User = User