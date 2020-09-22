# Sequelizer

This is a portfolio project to show you how and what I use. It is Rest API with CRUD, authentication and use of template engines.

### Tech Stack

  - Node.js
  - Express
  - Sequelize
  - Handlebars
  - CSS(SASS)
  - Javascript (ES6+)

### Usage


Install the dependencies and devDependencies and start the server.
```sh
$ npm install 
```
```sh
$ npm start 
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:3000
```

### MySQL

Add file `sequalizer/config/config.js` with code:

```sh
module.exports = {
    database: "your_database_name",
    username: "your_mysql_username",
    password: "your_mysql_password",
    sessionSecret: 'your_session_secret'
}
```
