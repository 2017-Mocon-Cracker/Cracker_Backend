module.exports = facebook;

function facebook(app, passport, FacebookStrategy){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : "132480600677095",
        clientSecret : "7e7b430487b7580a7941aea2a7e972b4",
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile);
    }));

    app.get('/facebook/token', passport.authenticate('facebook-token'), function (req, res) {
        console.log("user token =========" + req.param('access_token'));
        if(req.user){
            var response = {
                email : req.user.emails[0].value,
                name : req.user.name.familyName+req.user.name.givenName
            };
            res.send(200, response);
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });

    app.get('/success', (req, res)=>{
        res.send('success')
    })

    app.get('/fail', (req, res)=>{
        res.send('fail')
    })

    app.get('/facebook/callback',
        passport.authenticate('facebook-token',
            {
                successRedirect: '/',
                failureRedirect: '/'
            }));


}