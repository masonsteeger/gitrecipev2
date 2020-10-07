// ============
// DEPENDENCIES
// ============
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportlocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./models/user.js')


//=================
// CONFIG
//=================
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

//==============
// DATABASE
//==============
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//===================
// Error / Success
//===================
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


//============
//Middleware
//=============
app.use(express.json())
app.use(express.static('public'))
app.use(session({secret:process.env.SECRET, resave:true, saveUninitialized: true}))
app.use(cookieParser(process.env.SECRET))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)


//=========
//ROUTES
//=========
const recipeController = require('./controllers/recipes_controller.js')
app.use('/recipes', recipeController)



app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      console.log(err);
    }else if(!user){
      res.json({message: "wrong username or password"})
    }else{
      req.logIn(user, (err) => {
        if(err){
          console.log(err);
        }else{
          console.log('User Authenticated')
          console.log(user);
          res.json(user)
        }
      })
    }
  })
  (req, res, next)
})


app.post("/register", (req, res) => {
  User.findOne({username: req.body.regUsername}, async (err, foundUser) => {
    if (err){
      console.log(err);
    }else if(foundUser){
     console.log('User Already Exists')
    }else if(!foundUser){
      const hashedPass =  bcrypt.hashSync(req.body.regPassword, bcrypt.genSaltSync(10))
      const newUser = new User ({
        username: req.body.regUsername,
        password: hashedPass
      })
      await newUser.save();
      console.log("user created" + newUser);
    }
  })
})


//===============
// LISTENERS
//===============

app.listen(PORT, () => {
  console.log('listening on PORT 3000');
})
