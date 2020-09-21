const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const model = require('../models/sequelizer')


module.exports = (passport) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            model.User.findOne({where: {username: username}})
                .then(user => {
                    if(!user)
                        return done(null, false)
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch)
                            return done(null, {username: user.username})
                        else
                            return done(null, false)
                    })
                }).catch(e => console.log(e)
            )
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        done(null, {username: username})
    })
}