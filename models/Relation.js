const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("relation", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    })
}