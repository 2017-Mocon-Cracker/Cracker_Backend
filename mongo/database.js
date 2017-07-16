var mongoose = require('mongoose')
var db = mongoose.connect("mongodb://localhost/Cracker", (err)=>{
    if(err){
        console.log('DB Error!')
        throw err
    }
    else{
        console.log('DB Connect Success!')
    }
})

var CardSchema = mongoose.Schema({
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
    CardIn : {
        type : Boolean
    },
    isEmpty : {
        type : Boolean
    },
    Paied : {
        type : Boolean
    },
    isTransfer : {
        type : Boolean
    }
})

var CheckPathSchema = mongoose.Schema({
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



CardInfo = mongoose.model('Card', CardSchema)
CheckPath = mongoose.model('CheckPath', CheckPathSchema)

exports.CardInfo = CardInfo
exports.CheckPath = CheckPath
exports.db = db;