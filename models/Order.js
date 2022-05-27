const Sequelize = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}
