(function(model){
    "use strict";
	
	// Most of the code here was taken from Lab 6. Credits to Thierry
	
	
	document.getElementById("hide_show").onclick = function (){
		var u_form = document.getElementById("uploader_form");
		var title = document.getElementById("form_title");
		if (u_form.style.display == "none"){
			u_form.style.display = "block";
		} else {
			u_form.style.display = "none";
		}
	}
    
	var insertImg = function (img){
		addImage(img, img.source);
		// display messages.
		window.history.pushState({}, "", "/?user=" + localStorage.getItem('owner') + "&id=" + img._id);
		updateMessages();
	}
	
	var addImage = function (img, url){
		var container = document.getElementById("slideshow_content");
        container.innerHTML = "";
		var e = document.createElement('div');
		e.className = "img"
		e.id = img._id;
		e.innerHTML = `
				<img src=${url}>
				<div class="imgtitle">${img.title}</div>
				<div class="imgauthor">${img.author}</div>`

		// add this element to the document
		container.prepend(e);
	}
	
	document.getElementById("prev").onclick = function (){
		updatePrevImg();
	}
	
	document.getElementById("next").onclick = function (){
		updateNextImg();
	}
	
	document.getElementById("delete_btn").onclick = function (){
		updateDeleteNextImg();
		var id = document.getElementsByClassName("img")[0].id;
		model.deleteImg(id, function(err){
		});
	}
			
	var updatePrevImg = function(){
		var id = document.getElementsByClassName("img")[0].id;
		model.getImg(localStorage.getItem('owner'), function(err, imgs){			
			if (err) return showError(err);
			var index;

			for(var i = 0; i < imgs.length; i += 1) {
				if(imgs[i]._id == id) {
					index = i;
					break;
				}
			}
			
			if (index == 0) { 
				index = imgs.length - 1;
			}
			else {
				index = index - 1;
			}
			if (imgs.length != 0) {
				insertImg(imgs[index]);
			}
		});
	}
	
	var updateNextImg = function(){
		var id = document.getElementsByClassName("img")[0].id;
		model.getImg(localStorage.getItem('owner'), function(err, imgs){		
			if (err) return showError(err);
						
			var index;

			for(var i = 0; i < imgs.length; i += 1) {
				if(imgs[i]._id == id) {
					index = i;
					break;
				}
			}
			
			if (index == imgs.length - 1) { 
				index = 0;
			}
			else {
				index = index + 1;
			}

			if (imgs.length != 0) {
				insertImg(imgs[index]);
			}
		});
	}
	
	var updateDeleteNextImg = function(){
		var id = document.getElementsByClassName("img")[0].id;
		model.getImg(localStorage.getItem('owner'), function(err, imgs){		
			if (err) return showError(err);
						
			var index;

			for(var i = 0; i < imgs.length; i += 1) {
				if(imgs[i]._id == id) {
					index = i;
					break;
				}
			}
			
			if (index == imgs.length - 1) { 
				index = 0;
			}
			else {
				index = index + 1;
			}

			if (imgs.length > 1) {
				insertImg(imgs[index]);
			} else {
				var container = document.getElementById("slideshow_content");
				container.innerHTML = "";
				var e = document.createElement('div');
				e.className = "img"

				e.innerHTML = `
				`
				// add this element to the document
				container.prepend(e);
			}
		});
	}
	
	var updateImage = function(){
		model.getImg(localStorage.getItem('owner'), function(err, imgs){
			var index 
			for(var i = 0; i < imgs.length; i += 1) {
				if(imgs[i]._id == id) {
					index = i;
					break;
				}
			}
			insertImg(imgs[imgs.length -1]);			
		});
	}
	
    var updateMessages = function(){
		var imgId = document.getElementsByClassName('img')[0].id;
        model.getMessages(imgId, function(err, messages){
            if (err) return showError(err);
            var container = document.getElementById("messages");
            container.innerHTML = "";
            messages.forEach(function (message){
                // create the message element
                var e = document.createElement('div');
                e.className = "message";
                e.id = message._id;
				e.innerHTML = `
				<div class="date">${message.createdAt.substring(0,10)}</div>
				<div class="author">${message.username}</div>
				<div class="content">${message.content}</div>;`

                // add upvote button
                var upvoteButton = document.createElement('div');
                upvoteButton.className = "upvote-icon icon";
                upvoteButton.innerHTML = message.upvote;
                upvoteButton.onclick = function (e){
                     model.upvoteMessage(e.target.parentNode.id, function(err){
                         if (err) return showError(err);
                         updateMessages();
                     });
                };
                e.append(upvoteButton);
                // add downvote button
                var downvoteButton = document.createElement('div');
                downvoteButton.innerHTML = message.downvote;
                downvoteButton.className = "downvote-icon icon";
                downvoteButton.onclick = function (e){
                    model.downvoteMessage(e.target.parentNode.id, function(err){
                        if (err) return showError(err);
                        updateMessages();
                    });
                };
                e.append(downvoteButton);
                // add delete button
                var deleteButton = document.createElement('div');
                deleteButton.className = "delete-icon icon";
                deleteButton.onclick = function (e){
					var owner = localStorage.getItem('owner');
                    model.deleteMessage(e.target.parentNode.id, owner, function(err){
                        if (err) return showError(err);
                        updateMessages();
                    });
                };
                e.append(deleteButton);
                // add this element to the document
                container.prepend(e);
            });
        });
    };
    
    (function scheduler(){
        setTimeout(function(e){
            updateMessages
            scheduler();
        },2000);
    }());
    
	
	document.getElementById("uploader_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
		
		data.title = document.getElementById("title_image").value;
        // data.author = document.getElementById("author_image").value;
		
		model.getActiveUsername(function(err, username){
			if (err) return showError(err);
			data.author = username;
		});
		
		// Check which one is checked
		if (document.getElementById("url_option").checked) {
			data.method = "url";
			data.source = document.getElementById("url").value;
		} else if (document.getElementById("file_option").checked) {
			data.method = "file";
			data.source = document.getElementById("image_file").files[0];
		}
		
		// Get the value
        if (data.title.length > 0 && data.author.length > 0 && data.source != null ){
            document.getElementById("uploader_form").reset();
			document.getElementById("image_file").style.display = "none";
			document.getElementsByClassName("image_url")[0].style.display = "none";
			model.createImg(data, function(err){
				if (err) return showError(err);
                e.target.reset();
				model.getImg(localStorage.getItem('owner'), function(err, imgs){
					if (err) return showError(err);
					if (imgs.length != 0) {
						if (imgs[imgs.length -1].method == "file"){
							imgs[imgs.length -1].source = data.source;
							model.updateImage(imgs[imgs.length -1], function(err){
								if (err) return showError(err);
							});
						}
						insertImg(imgs[imgs.length -1]);
					}
				});
			})
        }
    };
	
	document.getElementById("url_option").onclick = function (){
		document.getElementsByClassName("image_url")[0].style.display = "block";
		document.getElementById("image_file").style.display = "none";
	}
	
	/*
	document.getElementById("file_option").onclick = function (){
		document.getElementById("image_file").style.display = "block";
		document.getElementsByClassName("image_url")[0].style.display = "none";
	}
	*/
	
	window.onload = function scheduler(e){
		model.getActiveUsername(function(err, username){
			if (err) return showError(err);
			if (localStorage.getItem('owner') == username) {
				document.getElementsByClassName("switch")[0].style.display = "inline-block";
				document.getElementById("delete_btn").style.display = "inline-block";
				document.getElementById("uploader_form").style.display = "flex";
			}
			model.getImg(localStorage.getItem('owner'), function(err, imgs){
				if (err) return showError(err);
				if (imgs.length != 0) {
					insertImg(imgs[0]);
				} else {
				window.history.pushState({}, "", "/?user=" + localStorage.getItem('owner'));
				}
			});
		});	
    };
  
    document.getElementById("comment_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		if (dd < 10) {
			dd='0'+dd
		} 

		if (mm < 10) {
			mm='0'+mm
		}
		
        data.content = document.getElementById("comment").value;
		
		model.getActiveUsername(function(err, username){
			if (err) return showError(err);
			data.username = username;
		});
		
		data.date = mm+'/'+dd+'/'+yyyy;
		data.imgId = document.getElementsByClassName('img')[0].id;
		
        if (data.username.length > 0 && data.content.length > 0){
			model.createMessage(data, function(err){
				if (err) return showError(err);
                e.target.reset();
				updateMessages();
			})			
        }
    };

}(model))

