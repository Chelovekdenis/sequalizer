const Sequelize = require("sequelize")
const {database, username, password} = require('../config/config')

const sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    },
    logging: false
})

const Product = require("../models/Product")(sequelize)
const Company = require("../models/Company")(sequelize)
const User = require("../models/User")(sequelize)
const Chat = require("../models/Chat")(sequelize)
const Relation = require("../models/Relation")(sequelize)

Company.hasMany(Product, {onDelete: "cascade"})

User.belongsToMany(Chat, {through: Relation});
Chat.belongsToMany(User, {through: Relation});

module.exports.Product = Product
module.exports.Company = Company
module.exports.User = User
module.exports.Chat = Chat
module.exports.Relation = Relation