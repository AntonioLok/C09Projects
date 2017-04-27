var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var multer  = require('multer');
var crypto = require('crypto');
var upload = multer({ dest: 'uploads/' });

app.use(express.static('frontend'));

var Datastore = require('nedb');
var messages = new Datastore({ filename: 'db/messages.db', autoload: true, timestampData : true, corruptAlertThreshold: 1 });
var users = new Datastore({ filename: 'db/users.db', autoload: true ,corruptAlertThreshold: 1 });
var chatlog = new Datastore({ filename: 'db/chatlog.db', autoload: true ,corruptAlertThreshold: 1 });

var zomato = require('zomato');

app.use(express.static('../app/frontend/', {index: 'signin.html'}));

var client = zomato.createClient({
  userKey: 'a3f0994fdc44c475130ca518475b7974', //as obtained from [Zomato API](https://developers.zomato.com/apis) 
});

// Message constructor
var Message = function(message){
        this.content = message.content;
        this.username = message.username;
		this.id = message.id;
};

var Chatlog = function(chatlog) {
	this.id = chatlog.id;
	this.messages = chatlog.messages;
};


var User = function(user){
    this.username = user.username;
	this.salt = user.salt;
	this.saltedHash = user.saltedHash;
	this.birthday = user.birthday;
	this.age = user.age;
	this.gender = user.gender;
	this.latitude = user.latitude;
	this.longitude = user.longitude;
	this.picture = null;
	this.video = null;
	this.answer1 = user.answer1; 
	this.answer2 = user.answer2;
	this.answer3 = user.answer3;
	this.answer4 = user.answer4;
	this.answer5 = user.answer5;
	this.answer6 = user.answer6;
	this.answer7 = user.answer7;
	this.answer8 = user.answer8;
	this.answer9 = user.answer9;
	this.answer10 = user.answer10;
	this.answer11 = user.answer11;
	this.answer12 = user.answer12;
	this.answer13 = user.answer13;
	this.answer14 = user.answer14;
	this.answer15 = user.answer15;
	this.answer16 = user.answer16;
	this.answer17 = user.answer17;
	this.answer18 = user.answer18;
	this.answer19 = user.answer19;
	this.answer20 = user.answer20;
};

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
	cookie: { secure: true, sameSite: true }
}));

// sanitization and validation
var expressValidator = require('express-validator');
app.use(expressValidator({
    customValidators: {
     //   isAction: function(value) {
     //       return (['upvote','downvote'].indexOf(value) > -1);
     //   },
        fail: function(value){
            return false;
        }
    }
})); 

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    return next();
});

app.get('/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.redirect('/signin.html');
    });
});

app.get('/api/signout/', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.end();
    });
});

app.get('/api/restaurant/:username' , function (req, res, next) {
    users.findOne({username:req.params.username}, function (err, curruser) {
		client.getGeocode({
		lat:curruser.latitude, //latitude 
		lon:curruser.longitude, //longitude 
			count:1
		}, function(err, result){
		    if(!err){
		      
		    }else {
		  
		    }
			res.json(result);
			return next();
		});
	});
}); 

app.post('/api/signin/', function (req, res, next) {   //need this
	req.check('username', 'Invalid characters').isAlpha();
	var errors = req.validationErrors();
	if (!errors) {
    if (!req.body.username || ! req.body.password) return res.status(400).send("Bad Request");
    users.findOne({username: req.body.username}, function(err, user){
		if (!user) return res.status(401).end("Unauthorized");
		var salt = user.salt;
		var hash = crypto.createHmac('sha512', salt);
		hash.update(String(req.body.password)); 
		var saltedHash = hash.digest('base64');
        if (err) return res.status(500).end(err);
        if (saltedHash != user.saltedHash) return res.status(401).end("Unauthorized");
        req.session.user = user;
        res.cookie('username', user.username);
        return res.json(user);
    });
}
else {
	return res.status(401).end("Illegal characters used");
}
});

// Create

app.put('/api/users/', function (req, res, next) {  //need this
	req.check('username', 'Invalid characters').isAlpha();
	var errors = req.validationErrors();
	if (!errors) {
    	var data = new User(req.body);
		var salt = crypto.randomBytes(16).toString('base64');
		var hash = crypto.createHmac('sha512', salt);
		hash.update(String(req.body.password)); 
		var saltedHash = hash.digest('base64');
		data.salt = salt;
		data.saltedHash = saltedHash;
    	users.findOne({username: req.body.username}, function(err, user){
        	if (err) return res.status(500).end(err);
        	if (user) return res.status(409).end("Username " + req.body.username + " already exists");
        	users.insert(data, function (err, user) {
            	if (err) return res.status(500).end(err);
            	return res.json(user);
        	});
    	});
	}
	else {
		return res.status(401).end("Illegal characters used");
	}
});

app.post('/api/chatlog/', function (req, res, next) {
    var cl = new Chatlog(req.body);
    chatlog.insert(cl, function (err, data) {
        data.id = data._id;
        res.json(data);
        return next();
    });
});

// Read

app.get('/api/users/:username/*', function (req, res, next) {  //HERE WE NEED A WAY TO APPLY THE ALGORITHM AND FILTER OUT THE MATCHED USERS
	users.findOne({username:req.params.username}, function (err, curruser) {
		res.json(curruser);
		return next();
	});
});

app.get('/api/chatlog/:id/', function (req, res, next) {  //HERE WE NEED A WAY TO APPLY THE ALGORITHM AND FILTER OUT THE MATCHED USERS
	chatlog.findOne({id:req.params.id}, function (err, cl) {
		res.json(cl);
		return next();
	});
});

app.get('/api/usersAll/:username', function (req, res, next) {  //HERE WE NEED A WAY TO APPLY THE ALGORITHM AND FILTER OUT THE MATCHED USERS
	users.findOne({username:req.params.username}, function (err, curruser) {
	
		users.find({} , function(err, docs) { 
			var docs1 = []; 
			docs.forEach(function(d) {
				// if (distance(curruser.longitude, curruser.latitude, d.longitude , d.latitude) <= 20) {
			if (d.gender != curruser.gender) {
				var score = 0;
				if (d.answer1 == curruser.answer1) { score = score + 1;}
				if (d.answer2 == curruser.answer2) { score = score + 1;}
				if (d.answer3 == curruser.answer3) { score = score + 1;}
				if (d.answer4 == curruser.answer4) { score = score + 1;}
				if (d.answer5 == curruser.answer5) { score = score + 1;}
				if (d.answer6 == curruser.answer6) { score = score + 1;}
				if (d.answer7 == curruser.answer7) { score = score + 1;}
				if (d.answer8 == curruser.answer8) { score = score + 1;}
				if (d.answer9 == curruser.answer9) { score = score + 1;}
				if (d.answer10 == curruser.answer10) { score = score + 1;}
				if (d.answer11 == curruser.answer11) { score = score + 1;}
				if (d.answer12 == curruser.answer12) { score = score + 1;}
				if (d.answer13 == curruser.answer13) { score = score + 1;}
				if (d.answer14 == curruser.answer14) { score = score + 1;}
				if (d.answer15 == curruser.answer15) { score = score + 1;}
				if (d.answer16 == curruser.answer16) { score = score + 1;}
				if (d.answer17 == curruser.answer17) { score = score + 1;}
				if (d.answer18 == curruser.answer18) { score = score + 1;}
				if (d.answer19 == curruser.answer19) { score = score + 1;}
				if (d.answer20 == curruser.answer20) { score = score + 1;}
				if (score >= 10) {
					docs1.push(d);
				}
			}
				//}
			});

		res.json(docs1.reverse());
		return next();
	});
});
});

app.get('/api/usersPic/:username/', function (req, res, next) {
   // if (!req.session.user) return res.status(403).end("Forbidden");
    users.findOne({username: req.params.username}, function(err, user){
        if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
        if (user.picture){
            res.setHeader('Content-Type', user.picture.mimetype);
            return res.sendFile(path.join(__dirname, user.picture.path));
        }
        return res.redirect('/media/user.png');
    });    
});

// Get video
app.get('/api/usersVideo/:username/', function (req, res, next) {
   // if (!req.session.user) return res.status(403).end("Forbidden");
    users.findOne({username: req.params.username}, function(err, user){
        if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
        if (user.video){
            res.setHeader('Content-Type', user.video.mimetype);
            return res.sendFile(path.join(__dirname, user.video.path));
        }
        return res.redirect('/media/user.png');
    });    
});

//Update

app.patch('/api/usersPic/:username/', upload.single('picture'), function (req, res, next) {
    // if (req.params.username !== req.session.user.username) return res.status(403).send("Forbidden");
     users.update({username: req.params.username}, {$set: {picture: req.file}}, {multi:false}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});

// Update video
app.patch('/api/usersVideo/:username/', upload.single('video'), function (req, res, next) {
     if (req.params.username !== req.session.user.username) return res.status(403).send("Forbidden");
	 console.log(req.file);
     users.update({username: req.params.username}, {$set: {video: req.file}}, {multi:false}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});

app.patch('/api/userLoc/:username/', function (req, res, next) {
     if (req.params.username !== req.params.username) return res.status(403).send("Forbidden");
     users.update({username: req.params.username}, {$set: {longitude: req.body.longitude, latitude: req.body.latitude}}, {multi:true}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});

app.patch('/api/chatlog/:id/', function (req, res, next) {
     if (req.params.username !== req.params.username) return res.status(403).send("Forbidden");
     chatlog.update({id: req.params.id}, {$set: {messages: req.body.messages}}, {multi:true}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});


app.patch('/api/users/:username/*/', function (req, res, next) {
     if (req.params.username !== req.params.username) return res.status(403).send("Forbidden");
     users.update({username: req.params.username}, {$set: {answer1: req.body.answer1, answer2: req.body.answer2, answer3: req.body.answer3, answer4: req.body.answer4, answer5: req.body.answer5, answer6: req.body.answer6, answer7: req.body.answer7, answer8: req.body.answer8, answer9: req.body.answer9, answer10: req.body.answer10, answer11: req.body.answer11, answer12: req.body.answer12, answer13: req.body.answer13, answer14: req.body.answer14, answer15: req.body.answer15, answer15: req.body.answer15, answer16: req.body.answer16, answer17: req.body.answer17, answer18: req.body.answer18, answer19: req.body.answer19, answer20: req.body.answer20, }}, {multi:false}, function (err, n) {
         if (err) return res.status(404).end("User username:" + req.params.username + " does not exists");
         return res.json("");
     });        
});
// Delete

app.delete('/api/messages/:id/', function (req, res, next) {
    messages.remove({ _id: req.params.id }, { multi: false }, function(err, num) {  
        if(num===0){
            res.status(404).end("Message id:" + req.params.id + " does not exists");
            return next();
        }
        res.end();
        return next();
    });
});

app.delete('/api/images/:id', function (req, res, next) {
    images.remove({_id: req.params.id }, { multi: false }, function(err, num) {  
        if(num===0){
            res.status(404).end("Image id:" + req.params.id + " does not exists");
            return next();
        }
        res.end();
        return next();
    });
});

app.use(function (req, res, next){
    console.log("HTTP Response", res.statusCode);
});

var fs = require('fs');
var http = require('http');


http.createServer(app).listen(3000, function () {
    console.log('HTTP on port 3000');
});
