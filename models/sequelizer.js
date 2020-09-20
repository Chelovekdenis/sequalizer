const Sequelize = require("sequelize")

const dbInfo = require('../config/database').dbInfo

const sequelize = new Sequelize(...dbInfo, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
})

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prise: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const Company = sequelize.define("company", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Company.hasMany(Product, {onDelete: "cascade"})

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

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



// module.exports.sequelize = sequelize
module.exports.Product = Product
module.exports.Company = Company
module.exports.User = User