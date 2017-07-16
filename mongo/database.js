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

var CardSchema = new schema({
    Money : {
        type: Number
    },
    CardNum : {
        type : String
    },
    Email : {
        type: String
    },
    CardName : {
        type : String
    },
    UserName : {
        type : String
    },
    isEmpty : {
        type : Number
    },
    Paied : {
        type : Number
    },
    isTransfer : {
        type : Number
    }
})

var CheckPathSchema = new schema({
    Station_ID : {
        type : String
    },
    Beacon_ID : {
        type : String
    },
    Time : {
        type : String
    },
    Date : {
        type : String
    },
    Bus_Num : {
        type : String
    }
})



var CardInfo = mongoose.model('Card', CardSchema)
var CheckPath = mongoose.model('CheckPath', CheckPathSchema)


exports.CardInfo = CardInfo
exports.CheckPath = CheckPath
exports.db = db;