const Sequelize = require("sequelize")
const {database, username, password} = require('../config/config')

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

module.exports.Product = Product
module.exports.Company = Company
module.exports.User = User