const createError = require('http-errors')
const express = require('express')
const expressHbs = require('express-handlebars')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const sassMiddleware = require('node-sass-middleware')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const createRouter = require('./routes/create')
const editRouter = require('./routes/edit')
const deleteRouter = require('./routes/delete')
const loginRouter = require('./routes/login')
const registrationRouter = require('./routes/registration')
const dashboardRouter = require('./routes/dashboard')

const app = express()

require('./config/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine("hbs", expressHbs(
    {
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs"
    }
))
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

// const logger = require('morgan')
// app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'W$q4=25*8%v-}BV',
        resave: true,
        saveUninitialized: true
    })
)

app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/create', createRouter)
app.use('/edit', editRouter)
app.use('/delete', deleteRouter)
app.use('/login', loginRouter)
app.use('/registration', registrationRouter)
app.use('/dashboard', dashboardRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
