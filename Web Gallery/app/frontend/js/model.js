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
    
    model.createMessage = function (data, callback){
        doAjax("POST", '/api/messages/', data, true, callback);
    };
    
    // read
	
	model.getUsers = function (callback){
        doAjax("GET", "/api/users/", null, true, callback);
    };
	
	model.getImg = function (username, callback){
        doAjax("GET", "/api/imgs/" + username + "/", null, true, callback);
    };
    
    model.getMessages = function (imgId, callback){
        doAjax("GET", "/api/messages/" + imgId + "/", null, true, callback);
    };
	
    // update
	
	model.updateImage = function (data, callback){
		var formdata = new FormData();
        formdata.append("image", data.source);
        doAjax("PATCH", "/api/imgs/" + data._id + "/", formdata, false, callback);
    };
    
    model.upvoteMessage = function (id, callback){
        doAjax("PATCH", "/api/messages/" + id + "/", {action: "upvote"}, true, callback);
    };
    
    model.downvoteMessage = function (id, callback){
        doAjax("PATCH", "/api/messages/" + id + "/", {action: "downvote"}, true, callback);
    };

    // delete
	
	model.deleteImg = function (id, callback){
        doAjax("DELETE", "/api/imgs/" + id + "/", null, false, callback);
    };
    
    model.deleteMessage = function (id, owner, callback){
        doAjax("DELETE", "/api/messages/" + id + "/" + owner + "/" , null, false, callback);
    };
    
    return model;
    
}())

