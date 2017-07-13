var express = require('express')
var app = express()
var port = process.env.PORT||3000
var bodyParser = require('body-parser')
var db = require('./mongo/database')

app.listen(port,()=>{
    console.log('Server Running At '+port+' Port!')
})