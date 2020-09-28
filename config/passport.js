const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const model = require('../services/sequelizer')


module.exports = passport => {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            const user = await model.User.findOne({where: {username: username}})
            if(!user)
                return done(null, false)
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch)
                    return done(null, {username: user.username})
                else
                    return done(null, false)
            })
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        done(null, {username: username})
    })
}
