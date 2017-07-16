module.exports = user

function user(app, session, db){
    app.post('/card/add', (req, res)=>{
        var body = req.param('param')
        console.log(body)
        console.log('EMAIL : '+body.Email)
        console.log('CardName : '+body.CardName)
        console.log('CardNum : '+body.CardNum)
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
                        console.log(result)
                        res.status(200).send(result)
                    }
                })
            }
        })

    })

}
