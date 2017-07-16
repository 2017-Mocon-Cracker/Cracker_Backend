module.exports = user

function user(app, db, session){
    app.post('/card/add', (req, res)=>{
        var body = req.body;
        db.CardInfo.update({
            Email : req.session.email
        },{$set:{CardName:body.CardName, CardIn:true, CardNum:body.CardNum}}, (err)=>{
            if(err){
                console.log('/card/register cardupdate Error')
                res.status(403).send('/card/register cardupdate Error')
                throw err
            }
            else {
                res.status(200).send('Data Update Success')
            }
        })
    })

}
