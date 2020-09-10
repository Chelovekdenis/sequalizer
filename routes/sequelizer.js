const Sequelize = require("sequelize")

const sequelize = new Sequelize("usersdb2", "root", "88888888", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
})

const User = sequelize.define("user", {
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
Company.hasMany(User, {onDelete: "cascade"})

// !!! Убрать force: true, если не нужно создавать всегда заного базу данных
sequelize.sync({force: true}).then(()=>{
    console.log("Сервер ожидает подключения...")
    //создаем одну компанию
    Company.create({ name: "Apple"}).then(res=>{

        // получаем id созданной компании
        const compId = res.id
        //создаем пару товаров для этой компании
        User.create({name:"iPhone XS", prise: 12, companyId: compId}).catch(err=>console.log(err))
        User.create({name:"iPhone XR", prise: 13, companyId: compId}).catch(err=>console.log(err))

    }).catch(err=>console.log(err))

    Company.create({ name: "OnePlus"}).then(res=>{

        // получаем id созданной компании
        const compId = res.id
        //создаем пару товаров для этой компании
        User.create({name:"OnePlus 8", prise: 8, companyId: compId}).catch(err=>console.log(err))
        User.create({name:"OnePlus 8 Pro", prise: 9, companyId: compId}).catch(err=>console.log(err))

    }).catch(err=>console.log(err))
}).catch(err=>console.log(err))



// module.exports.sequelize = sequelize
module.exports.User = User
module.exports.Company = Company