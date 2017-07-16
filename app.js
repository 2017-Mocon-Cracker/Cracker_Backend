var express = require('express')
var app = express()
var port = process.env.PORT||8888
var bodyParser = require('body-parser')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook-token')
var session = require('express-session')
var db = require('./mongo/database')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({
    extended : false
}))

app.listen(port,()=>{
    console.log('Server Running At '+port+' Port!')
})

require('./routes/auth')(app)
require('./routes/facebook')(app, passport, FacebookStrategy, db, session)
require('./routes/user')(app, session, db)