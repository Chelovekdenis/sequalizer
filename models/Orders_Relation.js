const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("orders_relation", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
}
