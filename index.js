const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const User = require('./models/user');
const credentials = require('./credentials.js');

const app = express();

const handlebars = require('express-handlebars');
const hbs = handlebars.create({
    defaultLayout:'main'
});

const url =  require('./credentials')

mongoose.connect(url.mongo.uri, {useNewUrlParser: true, useUnifiedTopology: true})
    
// authentication
const auth = require('./lib/auth.js')(app, {
	baseUrl: process.env.BASE_URL,
	providers: credentials.authProviders,
	successRedirect: '/account',
	failureRedirect: '/unauthorized',
});
// auth.init() links in Passport middleware:
auth.init();

// now we can specify our auth routes:
auth.registerRoutes();

//handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'views');

// path config
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000
//Routes
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

// // authorization helpers
// function customerOnly(req, res, next){
// 	if(req.user && req.user.role==='customer') return next();
// 	// we want customer-only pages to know they need to logon
// 	res.redirect(303, '/unauthorized');
// }
// function employeeOnly(req, res, next){
// 	if(req.user && req.user.role==='employee') return next();
// 	// we want employee-only authorization failures to be "hidden", to
// 	// prevent potential hackers from even knowhing that such a page exists
// 	next('route');
// }
// function allow(roles) {
// 	return function(req, res, next) {
// 		if(req.user && roles.split(',').indexOf(req.user.role)!==-1) return next();
// 		res.redirect(303, '/unauthorized');
// 	};
// }
app.get('/account', function(req, res){
    // if(!req.user)
    // return res.redirect(303, '/unauthorized');
    res.render('account');
    // res.render('account', { username: req.user.name });
});

app.get('/unauthorized', function(req, res) {
	res.status(403).render('unauthorized', {name: req.body.name});
});

//обработчик ошибок 404
app.use(function(req, res, next){
    res.status(404);
    res.send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});