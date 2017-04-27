(function(model){
    "use strict";
    
	var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    }
	
	window.onload = function scheduler(e){
		display_galleries();
	};	

	var display_galleries = function(){
        model.getUsers(function(err, users){
            if (err) return showError(err);
            var container = document.getElementById("galleries");
            container.innerHTML = "";
            users.forEach(function (user){
                // create the message element
                var e = document.createElement('div');
                e.className = "gallery";
                e.id = user._id;
                e.innerHTML = `
				<div class="gallery_name" name=${user.username}>${user.username} 's gallery</div>`               
				e.onclick = function (e) {
					localStorage.setItem("owner", user.username);
					window.location = 'gallery.html';
				}
                container.prepend(e);
            });
        });
    };
    
}(model))