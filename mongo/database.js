var mongoose = require('mongoose')
var schema = mongoose.Schema;
var db = mongoose.connect("mongodb://localhost/Cracker", (err)=>{
    if(err){
        console.log('DB Error!')
        throw err
    }
    else{
        console.log('DB Connect Success!')
    }
})


exports.db = db;