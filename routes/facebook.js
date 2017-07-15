module.exports = facebook;

function facebook(app, passport, FacebookStrategy, session) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : '132480600677095',
        clientSecret : '7e7b430487b7580a7941aea2a7e972b4',
        callbackURL: "/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'verified'],
    }, (req, accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        done(null, profile)
    }))

    app.get('/facebook/token',
        passport.authenticate('facebook', { scope : ['email', 'public_profile', 'read_stream', 'publish_actions']})
    )

    app.get('/success', (req, res)=>{
        res.status(200).send('로그인 성공')
    })

    app.get('/fail', (req, res)=>{
        res.status(500).send("로그인 실패")
    })


    app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/success',
            failureRedirect: '/fail'
        }));

}