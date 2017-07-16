module.exports = facebook;

function facebook(app, passport, FacebookStrategy, db, session){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser((obj, done)=>{
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : "132480600677095",
        clientSecret : "7e7b430487b7580a7941aea2a7e972b4",
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile);
        var card = new db.CardInfo({
            Money : 1000,
            CardNum : null,
            Email : profile.emails[0].value,
            CardName : "",
            UserName : profile.name.familyName+profile.name.givenName,
            isEmpty : 0,
            Paied : 0,
            isTransfer : 0
        })
        console.log('CARD ==== '+card)
        db.CardInfo.findOne({
            Email : profile.emails[0].value
        },(err, result)=>{
            if(err){
                console.log('facebook login Error')
                throw err
            }
            else if(result){
                done(null, profile)
            }
            else if(!result){
                card.save((err)=>{
                    if(err){
                        console.log('card save Error')
                        throw err
                    }
                    else {
                        console.log('Card Save Success')
                        done(null, profile)
                    }
                })
            }
        })
    }));

    app.get('/facebook/token', passport.authenticate('facebook-token'), (req, res)=>{
        console.log("USER_TOKEN ========= " + req.param('access_token'));
        console.log(req.user)
        console.log(req.user.emails[0].value)
        req.session.email = req.user.emails[0].value
        console.log(req.user.name.familyName+req.user.name.givenName)
        if(req.user){
            db.CardInfo.findOne({
                Email : req.user.emails[0].value,
            },(err, result)=>{
                if(err){
                    console.log('/facebook/token Error')
                    throw err
                }
                else if(result){
                    res.send(200, result)
                }
                else{
                    res.send(401, "Data Not Founded")
                }
            })
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });


    app.get('/facebook/callback',
        passport.authenticate('facebook-token',
            {
                successRedirect: '/',
                failureRedirect: '/'
            }));


}