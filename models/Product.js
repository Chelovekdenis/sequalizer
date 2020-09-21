const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("product", {
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
}