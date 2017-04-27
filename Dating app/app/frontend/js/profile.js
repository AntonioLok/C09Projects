(function(model){
    "use strict";
	model.getActiveUsername(function(err, username){
		model.getUser(username , function (err , user) {
			if (user.answer1 == "n") {document.getElementById("a1no").checked = true;} else {document.getElementById("a1yes").checked = true;}
			if (user.answer2 == "n") {document.getElementById("a2no").checked = true;} else {document.getElementById("a2yes").checked = true;}
			if (user.answer3 == "n") {document.getElementById("a3no").checked = true;} else {document.getElementById("a3yes").checked = true;}
			if (user.answer4 == "n") {document.getElementById("a4no").checked = true;} else {document.getElementById("a4yes").checked = true;}
			if (user.answer5 == "n") {document.getElementById("a5no").checked = true;} else {document.getElementById("a5yes").checked = true;}
			if (user.answer6 == "n") {document.getElementById("a6no").checked = true;} else {document.getElementById("a6yes").checked = true;}
			if (user.answer7 == "n") {document.getElementById("a7no").checked = true;} else {document.getElementById("a7yes").checked = true;}
			if (user.answer8 == "n") {document.getElementById("a8no").checked = true;} else {document.getElementById("a8yes").checked = true;}
			if (user.answer9 == "n") {document.getElementById("a9no").checked = true;} else {document.getElementById("a9yes").checked = true;}
			if (user.answer10 == "n") {document.getElementById("a10no").checked = true;} else {document.getElementById("a10yes").checked = true;}
			if (user.answer11 == "n") {document.getElementById("a11no").checked = true;} else {document.getElementById("a11yes").checked = true;}
			if (user.answer12 == "n") {document.getElementById("a12no").checked = true;} else {document.getElementById("a12yes").checked = true;}
			if (user.answer13 == "n") {document.getElementById("a13no").checked = true;} else {document.getElementById("a13yes").checked = true;}
			if (user.answer14 == "n") {document.getElementById("a14no").checked = true;} else {document.getElementById("a14yes").checked = true;}
			if (user.answer15 == "n") {document.getElementById("a15no").checked = true;} else {document.getElementById("a15yes").checked = true;}
			if (user.answer16 == "n") {document.getElementById("a16no").checked = true;} else {document.getElementById("a16yes").checked = true;}
			if (user.answer17 == "n") {document.getElementById("a17no").checked = true;} else {document.getElementById("a17yes").checked = true;}
			if (user.answer18 == "n") {document.getElementById("a18no").checked = true;} else {document.getElementById("a18yes").checked = true;}
			if (user.answer19 == "n") {document.getElementById("a19no").checked = true;} else {document.getElementById("a19yes").checked = true;}
			if (user.answer20 == "n") {document.getElementById("a20no").checked = true;} else {document.getElementById("a20yes").checked = true;}
		});
	});
	document.getElementById("a1no").onclick = function() {
		document.getElementById("a1yes").checked = false;
	};
	document.getElementById("a2no").onclick = function() {
		document.getElementById("a2yes").checked = false;
	};
	document.getElementById("a3no").onclick = function() {
		document.getElementById("a3yes").checked = false;
	};
	document.getElementById("a4no").onclick = function() {
		document.getElementById("a4yes").checked = false;
	};
	document.getElementById("a5no").onclick = function() {
		document.getElementById("a5yes").checked = false;
	};
	document.getElementById("a6no").onclick = function() {
		document.getElementById("a6yes").checked = false;
	};
	document.getElementById("a7no").onclick = function() {
		document.getElementById("a7yes").checked = false;
	};
	document.getElementById("a8no").onclick = function() {
		document.getElementById("a8yes").checked = false;
	};
	document.getElementById("a9no").onclick = function() {
		document.getElementById("a9yes").checked = false;
	};
	document.getElementById("a10no").onclick = function() {
		document.getElementById("a10yes").checked = false;
	};
	document.getElementById("a11no").onclick = function() {
		document.getElementById("a11yes").checked = false;
	};
	document.getElementById("a12no").onclick = function() {
		document.getElementById("a12yes").checked = false;
	};
	document.getElementById("a13no").onclick = function() {
		document.getElementById("a13yes").checked = false;
	};
	document.getElementById("a14no").onclick = function() {
		document.getElementById("a14yes").checked = false;
	};
	document.getElementById("a15no").onclick = function() {
		document.getElementById("a15yes").checked = false;
	};
	document.getElementById("a16no").onclick = function() {
		document.getElementById("a16yes").checked = false;
	};
	document.getElementById("a17no").onclick = function() {
		document.getElementById("a17yes").checked = false;
	};
	document.getElementById("a18no").onclick = function() {
		document.getElementById("a18yes").checked = false;
	};
	document.getElementById("a19no").onclick = function() {
		document.getElementById("a19yes").checked = false;
	};
	document.getElementById("a20no").onclick = function() {
		document.getElementById("a20yes").checked = false;
	};
	document.getElementById("a1yes").onclick = function() {
		document.getElementById("a1no").checked = false;
	};
	document.getElementById("a2yes").onclick = function() {
		document.getElementById("a2no").checked = false;
	};
	document.getElementById("a3yes").onclick = function() {
		document.getElementById("a3no").checked = false;
	};
	document.getElementById("a4yes").onclick = function() {
		document.getElementById("a4no").checked = false;
	};
	document.getElementById("a5yes").onclick = function() {
		document.getElementById("a5no").checked = false;
	};
	document.getElementById("a6yes").onclick = function() {
		document.getElementById("a6no").checked = false;
	};
	document.getElementById("a7yes").onclick = function() {
		document.getElementById("a7no").checked = false;
	};
	document.getElementById("a8yes").onclick = function() {
		document.getElementById("a8no").checked = false;
	};
	document.getElementById("a9yes").onclick = function() {
		document.getElementById("a9no").checked = false;
	};
	document.getElementById("a10yes").onclick = function() {
		document.getElementById("a10no").checked = false;
	};
	document.getElementById("a11yes").onclick = function() {
		document.getElementById("a11no").checked = false;
	};
	document.getElementById("a12yes").onclick = function() {
		document.getElementById("a12no").checked = false;
	};
	document.getElementById("a13yes").onclick = function() {
		document.getElementById("a13no").checked = false;
	};
	document.getElementById("a14yes").onclick = function() {
		document.getElementById("a14no").checked = false;
	};
	document.getElementById("a15yes").onclick = function() {
		document.getElementById("a15no").checked = false;
	};
	document.getElementById("a16yes").onclick = function() {
		document.getElementById("a16no").checked = false;
	};
	document.getElementById("a17yes").onclick = function() {
		document.getElementById("a17no").checked = false;
	};
	document.getElementById("a18yes").onclick = function() {
		document.getElementById("a18no").checked = false;
	};
	document.getElementById("a19yes").onclick = function() {
		document.getElementById("a19no").checked = false;
	};
	document.getElementById("a20yes").onclick = function() {
		document.getElementById("a20no").checked = false;
	};

	//on submit pass new stuff to db
	document.getElementById("profile").onsubmit = function(e) {
		   e.preventDefault();
		var data = {};
		if (document.getElementById("a1no").checked) {data.answer1 = "n";} else {data.answer1 = "y";}
		if (document.getElementById("a2no").checked) {data.answer2 = "n";} else {data.answer2 = "y";}
		if (document.getElementById("a3no").checked) {data.answer3 = "n";} else {data.answer3 = "y";}
		if (document.getElementById("a4no").checked) {data.answer4 = "n";} else {data.answer4 = "y";}
		if (document.getElementById("a5no").checked) {data.answer5 = "n";} else {data.answer5 = "y";}
		if (document.getElementById("a6no").checked) {data.answer6 = "n";} else {data.answer6 = "y";}
		if (document.getElementById("a7no").checked) {data.answer7 = "n";} else {data.answer7 = "y";}
		if (document.getElementById("a8no").checked) {data.answer8 = "n";} else {data.answer8 = "y";}
		if (document.getElementById("a9no").checked) {data.answer9 = "n";} else {data.answer9 = "y";}
		if (document.getElementById("a10no").checked) {data.answer10 = "n";} else {data.answer10 = "y";}
		if (document.getElementById("a11no").checked) {data.answer11 = "n";} else {data.answer11 = "y";}
		if (document.getElementById("a12no").checked) {data.answer12 = "n";} else {data.answer12 = "y";}
		if (document.getElementById("a13no").checked) {data.answer13 = "n";} else {data.answer13 = "y";}
		if (document.getElementById("a14no").checked) {data.answer14 = "n";} else {data.answer14 = "y";}
		if (document.getElementById("a15no").checked) {data.answer15 = "n";} else {data.answer15 = "y";}
		if (document.getElementById("a16no").checked) {data.answer16 = "n";} else {data.answer16 = "y";}
		if (document.getElementById("a17no").checked) {data.answer17 = "n";} else {data.answer17 = "y";}
		if (document.getElementById("a18no").checked) {data.answer18 = "n";} else {data.answer18 = "y";}
		if (document.getElementById("a19no").checked) {data.answer19 = "n";} else {data.answer19 = "y";}
		if (document.getElementById("a20no").checked) {data.answer20 = "n";} else {data.answer20 = "y";}
		data.picture = document.getElementById("picture").files[0];
		data.video = document.getElementById("video").files[0];
	
		// Update profile pic
		model.updateUserPP(data, function (err) {
			if (err) return showError(err);
            e.target.reset();
          //  window.location = '/';   <----CANT SET HEADER????
		});
		
		// Update user's video
		if (data.video != null){
			model.updateUserVideo(data, function (err) {
				if (err) return showError(err);
				e.target.reset();
				//  window.location = '/';   <----CANT SET HEADER????
			});
		}
		
		// Update ans
		model.updateUserAnswers(data, function (err) {
			if (err) return showError(err);
            e.target.reset();
            window.location.href = '/';
		}); 

	};
	
	
}(model))

