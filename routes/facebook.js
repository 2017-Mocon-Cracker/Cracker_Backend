module.exports = facebook;

function facebook(app, db, passport, FacebookStrategy) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : '841107499390440',
        clientSecret : 'e0dcace8cf7df0776b5c0011a1579ece',
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'verified'],
    }, (req, accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        done(null, profile)
    }))

    app.get('/auth/facebook/token',
        passport.authenticate(passport.authenticate('facebook-token'), (req, res)=>{
            console.log(req.param('access_token'))
            if(req.user){
                var response = {
                    name : req.user.name,
                    email : req.user.email,
                    id : req.user.id
                }
                res.send(200, response)
            }
            else if(!req.user){
                res.send(401, "Can't find User On Facebook. It May Be Unusable.");
            }

        })
    )

    app.get('/success', (req, res)=>{
        res.status(200).send("로그인 성공")
    })

    app.get('/fail', (req, res)=>{
        res.status(500).send("로그인 실패")
    })


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/success',
            failureRedirect: '/fail'
        }));

}