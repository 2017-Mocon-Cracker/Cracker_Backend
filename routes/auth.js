module.exports = auth;

function auth(app) {
    app.get('/', (req, res)=>{
        res.status(200).send('sex')
    })
}