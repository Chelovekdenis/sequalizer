const Sequelize = require("sequelize")
const {database, username, password} = require('../config/config')

const sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    },
    logging: false,
})

const User = require("../models/User")(sequelize)
const Chat = require("../models/Chat")(sequelize)
const Relation = require("../models/Relation")(sequelize)
const Order = require("../models/Order")(sequelize)
const Orders_Relation = require("../models/Orders_Relation")(sequelize)

// Для создания таблицы в базе данных
Orders_Relation.sync({force: true})

User.belongsToMany(Chat, {through: Relation})
Chat.belongsToMany(User, {through: Relation})

module.exports.User = User
module.exports.Chat = Chat
module.exports.Relation = Relation
module.exports.Order = Order
module.exports.Orders_Realtion = Orders_Relation
