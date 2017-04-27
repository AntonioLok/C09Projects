(function(model){
    "use strict";
	
	var display_video = function (){
		var uname = localStorage.getItem("candprof");
		model.getUser(uname, function (err , user) {

			var container = document.getElementById("candidate_content_vid");
			container.innerHTML = "";
			var e = document.createElement('div');
			e.className = "video"
			e.id = user._id;
			user.vid = '/api/usersVideo/' + user.username + "/";  
				e.innerHTML = `
				<video controls src=${user.vid}>
				`
				
			container.prepend(e);
		});
	}
	

    var display_profile = function(){	
		var uname = localStorage.getItem("candprof");
		model.getUser(uname , function (err , user) {    
			var container = document.getElementById("candidate_content_img");
			container.innerHTML = "";
			var e = document.createElement('div');
			e.className = "img"
			e.id = user._id;
			console.log(user);
			user.img = '/api/usersPic/' + user.username + "/"; 
			if (user.picture == null) {
				e.innerHTML = `
				<div class="candidate_title"> ${user.username} 
				<img src= "http://jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2.jpeg">
				<div class="candidate_name"> ${user.gender} 
				<div class="candidate_name"> ${user.birthday} 
				`
			}
			else {
			user.mimetype = user.picture.mimetype;
			e.innerHTML = `
			<div class="candidate_title"> ${user.username} 
			<img src=${user.img}>
			<div class="candidate_name"> ${user.gender} 
			<div class="candidate_name"> ${user.birthday} `
		}
			// add this element to the document

			container.prepend(e);
		});
	
	}
	
	document.getElementById("chatbtn").onclick = function () {
		model.getActiveUsername(function(err,username) {
			var otheruser = localStorage.getItem("candprof");
			var sortarray = [otheruser, username];
			sortarray.sort();
			var chatchannel = sortarray[0] + sortarray[1];
			localStorage.setItem("chatchannel", chatchannel); 
		});
		window.location = "/chat.html";
	}
	
	display_profile();
	display_video();
	
}(model))

