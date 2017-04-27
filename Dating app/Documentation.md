
Create
	•	description: create a new chatlog
	•	request: PUT /api/chatlog/
	◦	content-type: application/json
	◦	body: object
	▪		id (string): the combination of the two participants usernames
			messages (string): array of messages between users 
	•	response: 200
	◦	content-type: application/json
	◦	body: object
		   	id (string): the combination of the two participants usernames
			messages (string): array of messages between users 


$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"id":"DM","messages":"[\"Hi\",\"hello whats up\”]”}
       http://localhost:3000/api/chatlog/'



Create
	•	description: add a new user
	•	request: PUT
	◦	content-type: application/json
	◦	body: object
			username: (string) username of the new user
			salt: (string) salt to create saltedHash
			saltedHash: (string) salted hash based on the candidate 
			password and the known salt
			birthday(string): birthdate in string form
			answer1 - 20(string): answer to question 1 - 20 (y or n)
			latitude(integer): coordinates of user
			longitude(integer): coordinates of user
			gender(string): male or female
			picture: dictionary with image information
			video: dictionary with video information
	•	response: 200
	◦	content-type: application/json
	◦	body: object
			username: (string) username of the new user
			salt: (string) salt to create saltedHash
			saltedHash: (string) salted hash based on the candidate 
			password and the known salt
			birthday(string): birthdate in string form
			answer1 - 20(string): answer to question 1 - 20 (y or n)
			latitude(integer): coordinates of user
			longitude(integer): coordinates of user
			gender(string): male or female
			picture: dictionary with image information
			video: dictionary with video information


$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d ‘{"username":"D","salt":"e3q28hzCfrQ5F3vB9KyueQ==","saltedHash":"adZ43FhkbC35/0+pqs/woW00JQOT9XXWMX0kafLdXvIGVxhfytYwNUN+R6z+5fTMUs4CHuB7/2Q3u8Rhn/PDlA==","birthday":"1995-09-26","gender":"male","latitude":43.7872833,"longitude":-79.1902379,"answer1":"y","answer2":"y","answer3":"n","answer4":"n","answer5":"y","answer6":"y","answer7":"n","answer8":"n","answer9":"y","answer10":"y","answer11":"n","answer12":"n","answer13":"y","answer14":"y","answer15":"n","answer16":"n","answer17":"y","answer18":"y","answer19":"n","answer20":"n","_id":"wUSpuc8Boma9ga2s","picture":{"fieldname":"picture","originalname":"20150704_233757.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"fa69edaad3c2a51e1aa3430447f6f91e","path":"uploads/fa69edaad3c2a51e1aa3430447f6f91e","size":587956},"video":{"fieldname":"video","originalname":"RecordRTC-2017-03-29T20-39-35-926Z.webm","encoding":"7bit","mimetype":"video/webm","destination":"uploads/","filename":"3f3899ee6ab5ab353d87407674f4e224","path":"uploads/3f3899ee6ab5ab353d87407674f4e224","size":97313}}
       http://localhost:3000/api/users/'




Read
	•	description: get a specific user
	•	request: GET /api/users/:username
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			username: (string) username of the new user
			salt: (string) salt to create saltedHash
			saltedHash: (string) salted hash based on the candidate 
			password and the known salt
			birthday(string): birthdate in string form
			answer1 - 20(string): answer to question 1 - 20 (y or n)
			latitude(integer): coordinates of user
			longitude(integer): coordinates of user
			gender(string): male or female
			picture: dictionary with image information
			video: dictionary with video information

$ curl http://localhost:3000/api/users/Deniro

Read
	•	description: get a list of users that match with the given user
	•	request: GET /api/usersAll/:username
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			username: (string) username of the new user
			salt: (string) salt to create saltedHash
			saltedHash: (string) salted hash based on the candidate 
			password and the known salt
			birthday(string): birthdate in string form
			answer1 - 20(string): answer to question 1 - 20 (y or n)
			latitude(integer): coordinates of user
			longitude(integer): coordinates of user
			gender(string): male or female
			picture: dictionary with image information
			video: dictionary with video information

$ curl http://localhost:3000/api/usersAll/Deniro

Read
	•	description: get an image associated with the given user
	•	request: GET /api/usersPic/:username
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			fieldname (string)
			originalname (string)
			encoding (String)
			mimetype (String)
			destination (String)
			filename (String)
			path (String) 
			size (integer)

$ curl http://localhost:3000/api/usersPic/Deniro

Read
	•	description: get a video associated with the given user
	•	request: GET /api/usersVideo/:username
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			fieldname (string)
			originalname (string)
			encoding (String)
			mimetype (String)
			destination (String)
			filename (String)
			path (String) 
			size (integer)

$ curl http://localhost:3000/api/usersVideo/Deniro



Read
	•	description: get a chat log with the associated ID
	•	request: GET /api/chatlog/:id
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			id (string): the combination of the two participants usernames
			messages (string): array of messages between users 						      			password and the known salt
$ curl http://localhost:3000/api/chatlog/DeniroHg

Update 

	•	description: update user location
	•	request: GET /api/userLoc/:username
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			username (string): username we are updating
			latitude (integer): users latitude
			longitude (integer): users longitude	

$ curl -X PATCH 
       -H "Content-Type: `application/json`" 
       -d ‘{“username”:”Deniro”,”latitude”: 0, “longitude” : 0} 
       http://localhost:3000/api/userLoc/Deniro'		

Update 

	•	description: update user answers
	•	request: GET /api/users/:username/*
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			username (string): username we are updating
			answer 1-20(string): answers 1-20 of the user we are updating 
$ curl -X PATCH 
       -H "Content-Type: `application/json`" 
       -d ‘{“username”:”Deniro”,”answer1”: “y”, “answer20” : “n”} 
       http://localhost:3000/api/users/Deniro/*'	      	

Update 

	•	description: update chat log
	•	request: GET /api/chatlog/:id
	•	response: 200
	◦	content-type: application/json
	◦	body: list of objects
			id (string): id of chat log we are updating
			message (string): messages of chat log we are updating
$ curl -X PATCH
       -H "Content-Type: `application/json`" 
       -d '{"id":"DM","messages":"[\"Hi\",\"hello whats up\”]”}
       http://localhost:3000/api/chatlog/DM'		l




