(function(model){
	  "use strict";
	  
	  //get the channel for the correct 2 people
	  var chatchannel = localStorage.getItem("chatchannel");
      var pubnub = new PubNub({ publishKey : 'demo', subscribeKey : 'demo' });
      function $(id) { return document.getElementById(id); }
      var box = $('box'), input = $('input'), channel = chatchannel;   ///<-----This line determines who can see the chat. when two users are chatting make this (user1+user2 )
	  var messages = [];
	  
	  model.getActiveUsername(function(err,username) {
		  model.getRestaurants(username, function(err, restaurants) {
			  var count = 0;
			  var rest = JSON.parse(restaurants);
			  for(var key in rest["nearby_restaurants"]) {
			    var value = rest["nearby_restaurants"][count]["restaurant"];
				count = count + 1;
			  	//alert(value["name"] + "      Address:" + value["location"]["address"] + "      Rating:" + value["user_rating"]["aggregate_rating"] + "/5");
				var restaurants = document.getElementById("restaurants");
				restaurants.innerHTML = restaurants.innerHTML + `<div class="restaurant">
						<span class="name">${value["name"]}</span>
						<br/>
						<span class="addr">${value["location"]["address"]}</span>
						<span class="rating">${value["user_rating"]["aggregate_rating"]}/5 </span>
					</div>`
			}
	  });
		  
	  });

		  
	  model.getChatlog(chatchannel, function (err, chatlog) {   
		  if (chatlog == null) { //If theres no msg history we need to make a blank one
			  var data = {};
			  data.id = chatchannel;
			  data.messages = JSON.stringify([]);
			  model.createChatlog(data,function(err,chatlog){
              });
		  }
		  else {
		  	model.getChatlog(chatchannel , function(err, chatlog){ 
				var chathistory = JSON.parse(chatlog.messages);  // if there is message history we want to load it
				var i;
				for (i in chathistory) {
					messages.push(chathistory[i]);
				} 
		  	  	var i;
				model.getActiveUsername(function(err,username) {
					for (i in messages) {
						if (messages[i].substring(0, messages[i].indexOf(":")) == username) {
							box.innerHTML = box.innerHTML + `<div class="bubble me">
						${messages[i]}
					</div>`
						} else {
						box.innerHTML = box.innerHTML + `<div class="bubble you">
						${messages[i]}
					</div>`
					}
					 // box.innerHTML = box.innerHTML + '<br>' + messages[i];
					}
				});
		    });
		  }
	  }); 
      
	  
      pubnub.addListener({
          message: function(obj) {
			  var chatchannel = localStorage.getItem("chatchannel"); 
			  model.getActiveUsername(function(err,username) {
				  messages.push(username + ':      '+obj.message); 
              	//box.innerHTML = box.innerHTML + '<br>' + (username + ':      '+obj.message).replace( /[<>]/g, '' )
				var message = (username + ':      '+obj.message).replace( /[<>]/g, '' );
				box.innerHTML = box.innerHTML + `<div class="bubble me">
						${message}
					</div>`
			  });     
			  var data = {};
			  data.id = chatchannel;
			  data.messages = JSON.stringify(messages);   //we add to the message history here
			  model.updateChatlog(data, function (err) {
			  });
			  
          }});
      pubnub.subscribe({channels:[channel]});
      input.addEventListener('keyup', function(e) {
          if ((e.keyCode || e.charCode) === 13) {
            pubnub.publish({channel : channel,message : input.value,x : (input.value='')});
        }
	 });
}(model))

