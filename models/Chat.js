const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("chat", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        messages: {
            type: Sequelize.JSON,
            allowNull: false
        }
    })
}