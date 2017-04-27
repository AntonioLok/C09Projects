var model = (function(){
    "use strict";
	
	// Most of the code here was taken from Lab 6. Credits to Thierry
    
    var doAjax = function (method, url, body, json, callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(e){
            switch(this.readyState){
                 case (XMLHttpRequest.DONE): 
                    if (this.status === 200) {
                        if(json) return callback(null, JSON.parse(this.responseText));
                        return callback(null, this.responseText);
                    }else{
                        return callback(new Error(this.responseText), null);
                    }
            }
        };
        xhttp.open(method, url, true);
        if (json && body){
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(body)); 
        }else{
            xhttp.send(body);  
        }        
    };
    
    var model = {};
	
	
	model.getActiveUsername = function(callback){
        var keyValuePairs = document.cookie.split('; ');
        for(var i in keyValuePairs){
            var keyValue = keyValuePairs[i].split('=');
            if(keyValue[0]=== 'username') return callback(null, keyValue[1]);
        }
        return callback("No active user", null);
    }
	
	// signUp, signIn and signOut
    
    model.signOut = function(callback){
        doAjax('DELETE', '/api/signout/', null, false, callback);
    }
    
    model.signIn = function(data, callback){
        doAjax('POST', '/api/signin/', data, true, function(err, user){
            if (err) return callback(err, user);
            callback(null, user);
        });
    }
        
    // init

    model.init = function (){
        model.getUsers();
    }
    
   // create
   
    model.createUser = function(data, callback){
        doAjax('PUT', '/api/users/', data, true, callback);
    }
   
    model.createImg = function (data, callback){
		doAjax('POST', '/api/imgs/', data, true, callback);	
    };
    
	model.createChatlog = function (data, callback){
		doAjax("POST", '/api/chatlog/',data,true, callback);
	}
    
    // read
	
	model.getChatlog = function (id , callback) {
		doAjax("GET", "/api/chatlog/" + id + "/", null, true, callback);
	}
	model.getRestaurants = function (username, callback) {
		doAjax("GET", "/api/restaurant/" + username + "/", null, true, callback);
	}
	model.getUsers = function (username, callback){
        doAjax("GET", "/api/usersAll/" + username + "/", null, true, callback);
    };
	
	model.getUser = function (username, callback){
        doAjax("GET", "/api/users/" + username + "/" + "*", null, true, callback);
    };
	
	model.getImg = function (username, callback){
        doAjax("GET", "/api/imgs/" + username + "/", null, true, callback);
    };
   	
    // update
	
	model.updateChatlog = function (data, callback){
		doAjax("PATCH", "/api/chatlog/" + data.id + "/", data, true, callback);
	};
	model.updateImage = function (data, callback){
		var formdata = new FormData();
        formdata.append("image", data.source);
        doAjax("PATCH", "/api/imgs/" + data._id + "/", formdata, false, callback);
    };
	
	model.updateUserPP = function (data, callback){
        var formdata = new FormData();
        formdata.append("picture", data.picture);
        model.getActiveUsername(function(err, username){
            if (err) return callback(err, null);
            doAjax("PATCH", "/api/usersPic/" + username + "/", formdata, false, callback);
        });
    };
	
	model.updateUserVideo = function (data, callback){
        var formdata = new FormData();
        formdata.append("video", data.video);
        model.getActiveUsername(function(err, username){
            if (err) return callback(err, null);
            doAjax("PATCH", "/api/usersVideo/" + username + "/", formdata, false, callback);
        });
    };
	
	model.updateUserVideoCam = function (video, callback){
        var formdata = new FormData();
        formdata.append("video", video);
        model.getActiveUsername(function(err, username){
            if (err) return callback(err, null);
            doAjax("PATCH", "/api/usersVideo/" + username + "/", formdata, false, callback);
        });
    };
	
    
    model.updateUser = function (data, callback){
        model.getActiveUsername(function(err, username){
            if (err) return callback(err, null);
            doAjax("PATCH", "/api/userLoc/" + username + "/", data, true, callback);
        });
    };
	
    model.updateUserAnswers = function (data, callback){
        model.getActiveUsername(function(err, username){
            if (err) return callback(err, null);
            doAjax("PATCH", "/api/users/" + username + "/" + "*", data, true, callback);
        });
    };
  
    return model;
    
}())

