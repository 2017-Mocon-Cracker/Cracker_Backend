var express = require('express')
var app = express()
var port = process.env.PORT||8888
var bodyParser = require('body-parser')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook')
var session = require('express-session')
var db = require('./mongo/database')

app.use(bodyParser.urlencoded({
    extended : false
}))

app.listen(port,()=>{
    console.log('Server Running At '+port+' Port!')
})

require('./routes/auth')(app)
require('./routes/facebook')(app, passport, FacebookStrategy, session)