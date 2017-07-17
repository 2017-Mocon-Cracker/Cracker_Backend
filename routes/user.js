module.exports = user

function user(app, session, db){
    app.post('/card/add', (req, res)=>{
        var body = JSON.parse(req.param('param'))
        console.log('==================== CARD_ADD ====================')
        console.log('======== CARD_BODY ========')
        console.log(body)
        db.CardInfo.update({
            Email : body.Email
        },{$set:{CardName:body.CardName, CardIn:true, CardNum:body.CardNum}}, (err)=>{
            if(err){
                console.log('/card/register cardupdate Error')
                res.status(403).send('/card/register cardupdate Error')
                throw err
            }
            else {
                db.CardInfo.findOne({
                    Email : body.Email
                }, (err, result)=>{
                    if(err){
                        console.log('err')
                        throw err
                    }
                    else if(result){
                        console.log('======== CARD_DB ========')
                        console.log(result)
                        console.log('=================== END ====================')
                        res.status(200).send(result)
                    }
                })
            }
        })

    })

}
