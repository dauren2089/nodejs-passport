const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const User = require('./models/user');

const app = express();

const handlebars = require('express-handlebars');
const hbs = handlebars.create({
    defaultLayout:'main'
});

const url =  require('./credentials')

mongoose.connect(url.MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000

app.get('/', function(req, res){
    res.render('home');
});

app.get('/signin', function(req, res) {
    res.render('signin');
});

app.post('/signin', async function(req, res){
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.redirect('/');
    } catch(error){
        console.log(error);
    }
})

app.get('/signup', function(req, res) {
    res.render('signup');
});

//обработчик ошибок 404
app.use(function(req, res, next){
    res.status(404);
    res.send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});