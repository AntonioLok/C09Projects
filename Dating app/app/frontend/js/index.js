(function(model){
    "use strict";
	var count = 0;
	model.getActiveUsername(function(err, user) {
		if(user == null) {
			window.location ='signin.html';
		}
	//	else {
	//		document.getElementById("curruser").innerHTML = "|| Current User: " + user;
	//	}
	});
	function distance(lon1, lat1, lon2, lat2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
	  var dLon = (lon2-lon1).toRad(); 
	  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	          Math.sin(dLon/2) * Math.sin(dLon/2); 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

	/** Converts numeric degrees to radians */
	if (typeof(Number.prototype.toRad) === "undefined") {
	  Number.prototype.toRad = function() {
	    return this * Math.PI / 180;
	  }
	}

	window.navigator.geolocation.getCurrentPosition(function(pos) {
	  var data = {};
	  data.latitude = pos.coords.latitude;
	  data.longitude = pos.coords.longitude;
	  model.updateUser(data, function (err) {   
		  if (err) return showError(err);
	  }); 
	});
    
	var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    }
	
	window.onload = function scheduler(e){
		display_galleries();
	};	
	
	document.getElementById("prev").onclick = function (){
		count = count - 1;
		display_galleries();
	}
	
	document.getElementById("next").onclick = function (){
		count = count + 1;
		display_galleries();
	}

	var display_galleries = function(){
		model.getActiveUsername(function(err,username) {
        model.getUsers(username , function(err, users){
            if (err) return showError(err);
            var container = document.getElementById("candidate_content1");
		   // Clear the container if necessary
		   while( container.hasChildNodes() ){
		       container.removeChild(container.lastChild);
		   } 
		   if (count < 0 ) {          // Check that the index is not illegal and if it is correct it
			   count = users.length - 1;
		   }
		   if (count > users.length - 1) {
		   	   count = 0;
		   }
		 	  var user = users[count];
			  if (user == null) {
				  document.getElementById("profilePic").src = "http://www.cuded.com/wp-content/uploads/2014/04/Sad-face.jpeg";
			  }
			  else {
  			  user.img = '/api/usersPic/' + user.username + "/"; 
  			  if (user.picture == null) {
				  document.getElementById("profilePic").src = "http://jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2.jpeg"
			  }
			  else {
	  			user.mimetype = user.picture.mimetype;
				document.getElementById("profilePic").src = user.img;
			  }
              var e = document.createElement('div');
              e.className = "gallery";
              e.id = user._id;
              e.innerHTML = `
			  <div class="candidate_name" name=${user.username}>${user.username}, ${user.gender}</div>`           
			  e.onclick = function (e) {
					localStorage.setItem("owner", user.username);
					window.location = 'gallery.html';
			  }
              container.append(e);
			  var a = document.createElement('a');
			  a.onclick = function() {
				  localStorage.setItem("candprof", user.username);
				  window.location = '/candidate_profile.html';
			  };
			      a.href =  '/candidate_profile.html'; // Insted of calling setAttribute 
			      a.innerHTML = "View profile"			  
				  a.style.fontSize = "40px";
				  a.style.marginLeft = "80%";
				  container.append(a);
			  }
          //  });
        });
	});
    };
    
}(model))