var crypto = require('crypto');
var path = require('path');
var express = require('express')
var app = express();
var fs = require('fs'); 
var util = require('util');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var Datastore = require('nedb');
var messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true});
var users = new Datastore({ filename: 'db/users.db', autoload: true });
var imgs = new Datastore({ filename: path.join(__dirname,'db', 'imgs.db'), autoload: true });
var privateKey = fs.readFileSync( 'server.key' );
var certificate = fs.readFileSync( 'server.crt' );
var config = {
        key: privateKey,
        cert: certificate
};

app.use(function (req, res, next){
    console.log("HTTPS request", req.method, req.url, req.body);
    return next();
});

// Most of the code here was taken from Lab 6. Credits to Thierry

// Message constructor
var Message = function(message){
    this.content = message.content;
    this.username = message.username;
	this.imgId = message.imgId;
    this.upvote = (message.upvote)? message.upvote : 0;
    this.downvote = (message.downvote)? message.downvote : 0;
};

// Image constructor
var Img = function(img){
	this.title = img.title;
    this.author = img.author;
	this.method = img.method;
	this.source = img.source;
}

var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.picture = null;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
};

// Authentication

var checkPassword = function(user, password){
        var hash = crypto.createHmac('sha512', user.salt);
        hash.update(password);
        var value = hash.digest('base64');
        return (user.saltedHash === value);
};

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: true }
}));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

// sanitization and validation
var expressValidator = require('express-validator');
app.use(expressValidator({
    customValidators: {
        isAction: function(value) {
            return (['upvote','downvote'].indexOf(value) > -1);
        },
        fail: function(value){
            return false;
        }
    }
})); 

app.use(function(req, res, next){
    Object.keys(req.body).forEach(function(arg){
        switch(arg){
            case 'username':
                req.checkBody(arg, 'invalid username').isAlpha();
                break;
            case 'password':
                break;
            case 'content':
                req.sanitizeBody(arg).escape();
                break;
			case 'imgId':
                req.sanitizeBody(arg).escape();
                break;
			case 'date':
                req.sanitizeBody(arg).escape();
                break;
			case 'title':
				req.sanitizeBody(arg).escape();
                break;
			case 'author':
				req.sanitizeBody(arg).escape();
                break;
			case 'method':
				req.sanitizeBody(arg).escape();
                break;
			case 'source':
				req.sanitizeBody(arg).escape();
                break;
            case 'action':
                req.checkBody(arg, 'invalid action').isAction();
                break;
            default:
                req.checkBody(arg, 'unknown argument').fail();
        }
    });
	 req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) return res.status(400).send('Validation errors: ' + util.inspect(result.array()));
        else next();
    });
});

// serving the frontend

app.get('/', function (req, res, next) {
    if (!req.session.user) return res.redirect('/signin.html');
    return next();
});

app.get('/gallery.html', function (req, res, next) {
    if (!req.session.user) return res.redirect('/signin.html');
    return next();
});

app.get('/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.redirect('/signin.html');
    });
});

app.use(express.static('frontend'));

// signout, signin

app.get('/api/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.end();
    });
});

app.post('/api/signin/', function (req, res, next) {
    if (!req.body.username || ! req.body.password) return res.status(400).send("Bad Request");
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user || !checkPassword(user, req.body.password)) return res.status(401).end("Unauthorized");
        req.session.user = user;
        res.cookie('username', user.username, {secure: true, sameSite: true, httponly: true});
        return res.json(user);
    });
});

// Create

app.put('/api/users/', function (req, res, next) {
    var data = new User(req.body);
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("Username " + req.body.username + " already exists");
        users.insert(data, function (err, user) {
            if (err) return res.status(500).end(err);
            return res.json(user);
        });
    });
});

app.post('/api/imgs/',function (req, res, next) {
	if (!req.session.user) return res.status(403).end("Forbidden");
    var img = new Img(req.body);
    imgs.insert(img, function (err, data) {
        data.id = data._id;
        res.json(data);
        return next();
    });
});

app.post('/api/messages/', function (req, res, next) {
	if (!req.session.user) return res.status(403).end("Forbidden");
    var message = new Message(req.body);
    messages.insert(message, function (err, data) {
        data.id = data._id;
		console.log(data.imageId);
        res.json(data);
        return next();
    });
});

// Read

app.get('/api/imgs/:username/', function (req, res, next) {
	var images = [];
	if (!req.session.user) return res.status(403).end("Forbidden");
    imgs.find({}).sort({createdAt:-1}).exec(function(err, selectedImgs) { 
        var usernames = selectedImgs.map(function(e){return {username: e.username};});
        users.find({ $or: usernames}, function(err, selectedUsers){
            selectedImgs.forEach(function(e){
				if (req.params.username == e.author){
					images.push(e);
					return e;
				}			
            });
            res.json(images.reverse());
            return next();
        });
    });
});

app.get('/api/messages/:imgId/', function (req, res, next) {
	var msgs = []
	if (!req.session.user) return res.status(403).end("Forbidden");
    messages.find({}).sort({createdAt:-1}).limit(10).exec(function(err, selectedMessages) { 
        var usernames = selectedMessages.map(function(e){return {username: e.username};});
        users.find({ $or: usernames}, function(err, selectedUsers){
            selectedMessages.forEach(function(e){
				if (req.params.imgId == e.imgId){
					msgs.push(e);
					return e;
				}
            });       
            res.json(msgs.reverse());
            return next();
        });
    });
});

app.get('/api/users/', function (req, res, next) {
	if (!req.session.user) return res.status(403).end("Forbidden");
	users.find({}).exec(function(err, user) {
		user.reverse().forEach(function(e){
			return(e);
		});
		res.json(user.reverse());
        return next();
	});
});

// Update

// This update the path for upload file.
app.patch('/api/imgs/:id/', upload.single("image"), function (req, res, next) {
	if (!req.session.user) return res.status(403).end("Forbidden");
	imgs.update({_id: req.params.id}, {$set: {source: req.file}}, {multi:false}, function (err, n) {
        if (err){
            res.status(404).end("Img ID:" + req.params.id + " does not exists");
            return next();
        }
        res.json("");
        return next();
	}); 	
});

app.patch('/api/messages/:id/', function (req, res, next) {
    var data = {};
	if (!req.session.user) return res.status(403).end("Forbidden");
    data[req.body.action] = 1;
    messages.update({_id: req.params.id},{$inc: data},  {multi:false}, function (err, n) {
        if (err){
            res.status(404).end("Message id:" + req.params.id + " does not exists");
            return next();
        }
        res.json("");
        return next();
    });
    return next();
});

// Delete

app.delete('/api/imgs/:id/', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    imgs.findOne({ _id: req.params.id }, function(err, img){
        if (err) return res.status(404).end("img id:" + req.params.id + " does not exists");
        if (img.author !== req.session.user.username) return res.status(403).send("Unauthorized");
        imgs.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
            if (err) return res.status(500).send("Database error");
            return res.end();
        });
    });  
});


app.delete('/api/messages/:id/:owner', function (req, res, next) {
    if (!req.session.user) return res.status(403).end("Forbidden");
    messages.findOne({ _id: req.params.id }, function(err, message){
        if (err) return res.status(404).end("Message id:" + req.params.id + " does not exists");
        if ((message.username !== req.session.user.username) && (req.params.owner !== req.session.user.username)){
			return res.status(403).send("Unauthorized");
		}
        messages.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
            if (err) return res.status(500).send("Database error");
            return res.end();
        });
    });  
});


app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

exports.app = app;

var https = require('https');
if (require.main === module) {
	https.createServer(config, app).listen(3000, function () {
		console.log('HTTPS on port 3000');
	});
};

