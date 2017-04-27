(function(model){
    "use strict";
    
    var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    };
	document.getElementById("male").onclick = function() {
		document.getElementById("female").checked = false;
	};
	document.getElementById("female").onclick = function() {
		document.getElementById("male").checked = false;
	};
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
    document.getElementById("signup").onsubmit = function (e){
        e.preventDefault();
		
	//	window.navigator.geolocation.getCurrentPosition(function(pos) {
        var data = {};
        data.username = document.getElementById("username").value;
        data.password = document.getElementById("password").value;
		data.birthday = document.getElementById("birthday").value;
	//	data.longitude = pos.coords.longitude;
	//	data.latitude = pos.coords.latitude;
		if (document.getElementById("male").checked) {data.gender = "male";} else {data.gender = "female";}          
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
        if (data.username.length>0 && data.password.length>0){
			
            model.createUser(data,function(err,user){
                if (err) return showError(err);
                e.target.reset();
                window.location = '/signin.html';
            });
        }
	//	});
    };
    
}(model))

