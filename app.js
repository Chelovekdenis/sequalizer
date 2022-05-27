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
const loginRouter = require('./routes/login')
const registrationRouter = require('./routes/registration')
const dashboardRouter = require('./routes/dashboard')
const chatRouter = require('./routes/chat')
const orderRouter = require('./routes/order')
const placementRouter = require('./routes/placement')

const app = express()

const {sessionSecret} = require('./config/config')

require('./config/passport')(passport)

// TODO
// [+] В мойм профиле отображать все мои ордера
// [+] Чтобы ордер в профиле можно было удалить
// [+] Возможность написать человеку, который сделал ордер
// [+] Поиск по товарам или услугам
// [] Сделать все красивым
// [+] Тесты (Моча)


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
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true
    })
)

app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/registration', registrationRouter)
app.use('/dashboard', dashboardRouter)
app.use('/chat', chatRouter)
app.use('/order', orderRouter)
app.use('/placement', placementRouter)


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
