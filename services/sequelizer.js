const Sequelize = require("sequelize")
const {database, username, password} = require('../config/config')

const sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
})

const Product = require("../models/Product")(sequelize)
const Company = require("../models/Company")(sequelize)
const User = require("../models/User")(sequelize)

Company.hasMany(Product, {onDelete: "cascade"})

const Chat = sequelize.define("chat", {
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
});

const Relation = sequelize.define("relation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

User.belongsToMany(Chat, {through: Relation});
Chat.belongsToMany(User, {through: Relation});


Chat.findOne({where: {id: 1}})
    .then(user=>{
        // console.log('------------------> ' + user.messages[1].text)

    });

// sequelize.sync({force:false}).then(()=>{
//
//     console.log("Tables have been created");
//
//     // User.create({
//     //     username: "user1",
//     //     password: "123"
//     // });
//     // User.create({
//     //     username: "user2",
//     //     password: "1234"
//     // });
//     // User.create({
//     //     username: "user3",
//     //     password: "12345"
//     // });
//     //
//     // Chat.create({
//     //     messages: {
//     //         name: "user1",
//     //         text: "Privet))",
//     //         time: "11:05",
//     //         date: "27.09.2020"
//     //     }
//     // })
//     // Chat.create({
//     //     messages: {
//     //         name: "user2",
//     //         text: "Kak dela?",
//     //         time: "12:05",
//     //         date: "24.09.2020"
//     //     }
//     // })
//     // Chat.create({
//     //     messages: {
//     //         name: "user3",
//     //         text: "I hypil tachky",
//     //         time: "11:05",
//     //         date: "27.10.2000"
//     //     }
//     // })
//
//     // получаем пользователя с именем Tom
//     User.findOne({where: {username: "user1"}})
//         .then(user=>{
//             if(!user) return;
//
//             // добавим Тому курс по JavaScript
//             Chat.findOne({where: {id: 1}})
//                 .then(chat=>{
//                     if(!chat) return;
//                     user.addChat(chat);
//
//                     console.log('----------------------->')
//                     User.findOne({where: {username: "user1"}})
//                         .then(user=>{
//                             console.log('------------------> ' + user)
//                             if(!user) return;
//                             user.getChats().then(chats=>{
//                                 for(chat of chats){
//                                     console.log(chat.messages);
//                                 }
//                             });
//                         });
//                 });
//         });
//
// }).catch(err=>console.log(err));

module.exports.Product = Product
module.exports.Company = Company
module.exports.User = User
module.exports.Chat = Chat
module.exports.Relation = Relation