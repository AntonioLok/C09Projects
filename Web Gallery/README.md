---
layout: default
---

Web Gallery application where users can share pictures and comments. 
This application is similar to existing web applications such as Facebook (the photo album part), Picasa or Flickr.

Each user will now has his/her own gallery. Users will be authenticated through the API (local authentication based on sessions). In addition of supporting these feature, access to the API is ruled by the following authorization policy:

Non authenticated cannot read any picture nor comment
Non-authenticated can sign-up and sign-in into the application
Authenticated users can sign-out of the application
Authenticated users can browse any gallery
Gallery owners can upload and delete pictures to their own gallery only
Authenticated users can post comments on any picture of any gallery
Authenticated users can delete any one of their own comments but not others
Gallery owners can delete any comment on any picture from their own gallery

In this app:
HTTPS enabled to prevent eavesdropping and spoofing attacks
All users’ inputs validated to prevent content spoofing and cross-site scripting attacks
Cookies secured to prevent mixed-content attacks

# A3: API Documentation

### Create

## Users

- description: create a new user
- request: `POST /api/users/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the user
      - password: (string) the password of the user
- response: 200
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the user
      - salt: (byte) 
      - hash: (byte)
      - saltedhash: (byte)
- response: 409
    - user already exists
	
``` 
$ curl -X POST 
       http://localhost:3000/api/users/'
```

## User session

- description: create a new user session
- request: `POST /api/signin/`
    - content-type: `application/json`
    - body: object
      - username: (string) the username of the user
      - password: (string) the password of the user
- response: 200
    - content-type: `application/json`
    - body: object
		user session (string)
- response: 400
    - bad request
	
``` 
$ curl -X POST 
       http://localhost:3000/api/signin/'
```

## Messages
- description: create a new message
- request: `POST /api/messages/`
    - content-type: `application/json`
    - body: object
      - content: (string) the content of the message
      - author: (string) the authors username
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 403
    - body: No session user

``` 
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"content":"hello world","author":"me"} 
       http://localhost:3000/api/messages/'
```

## Images
- description: create a new image
- request: `POST /api/imgs/`
    - content-type: `application/json`
    - body: object
      - title: (string) the title of the image
      - author: (string) the authors of the image
- response: 200
    - content-type: `application/json`
    - body: object
      - title: (string) the title of the img
      - author: (string) the author of the img
      - method: (string) file/url
	  - _id: (string) the image id
      - source: (string) URL link or FILE
- response: 403
    - body: No session user
``` 
$ curl -X POST 
       http://localhost:3000/api/imgs/'
```

### Read

## Homepage
- description: redirect to signing
- request: `GET /`   
- response: 200
    - content-type: `application/json`
    - body: 
		redirected to signin.html
``` 
$ curl http://localhsot:3000/
``` 

## Gallery
- description: redirect to signing
- request: `GET /gallery.html/`   
- response: 200
    - content-type: `application/json`
    - body: 
		redirected to signin.html
``` 
$ curl http://localhsot:3000/gallery.html/
``` 

## Signout
- description: redirect to signing
- request: `GET /signout/`   
- response: 200
    - content-type: `application/json`
    - body: 
		redirected to signin.html
``` 
$ curl http://localhsot:3000/signout/
``` 

## Signout
- description: End user session
- request: `GET /api/signout/`   
- response: 200
    - content-type: `application/json`
    - body: 
		End user session
``` 
$ curl http://localhsot:3000/api/signout/
``` 

## Users
- description: retrieve all users
- request: `GET /api/users/`   
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - username: (string) the username of the user
- response: 403
    - body: No session user
``` 
$ curl http://localhsot:3000/api/users/
``` 

## Messages
- description: retrieve the last 10 messages  that match the given ID
- request: `GET /api/messages/:id/[?limit=10]/`   
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 403
    - body: No session user 
``` 
$ curl http://localhsot:3000/api/messages/?id=1234
``` 

## Images
- description: retrieve the images that match with the give nID
- request: `GET /api/imgs/:id`   
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - title: (string) the title of the img
      - author: (string) the author of the img
      - method: (string) file/url
	  - _id: (string) the id of the image
      - source: (string) URL link or FILE
- response: 403
    - body: No session user 
``` 
$ curl http://localhsot:3000/api/imgs/?id=123
``` 
  
###  Update

- description: retrieve the message id
- request: `GET /api/messages/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 404
    - body: message id does not exists
- response: 403
    - body: No session user
``` 
$ curl http://localhsot:3000/api/messages/jed5672jd90xg4awo789/
``` 
  
### Update

- description: upvote or downvote the message id
- request: `PATCH /api/messages/:id/`
    - content-type: `application/json`
    - body: object
      - action: (string) either `upvote` or `downvote`
- response: 200
    - content-type: `application/json`
    - body: object
      - _id: (string) the message id
      - content: (string) the content of the message
      - author: (string) the authors username
      - upvote: (int) the number of upvotes
      - downvote: (int) the number of downvotes
- response: 204
    - body: invalid argument
- response: 404
    - body: message :id does not exists
- response: 403
    - body: No session user
``` 
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{"action":"upvote"} 
       http://localhsot:3000/api/messages/jed5672jd90xg4awo789/'
```
  
  
### Delete

## Images
- description: delete the message id
- request: `DELETE /api/messages/:id/:owner`
- response: 200
    - content-type: `application/json`
- response: 404
    - body: message :id does not exists
- response: 500

``` 
$ curl -X DELETE
       http://localhsot:3000/api/imgs/jed5672jd90xg4awo789/antonio
``` 
 
## Messages
- description: delete the message id
- request: `DELETE /api/messages/:id/`
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the message id
        - content: (string) the content of the message
        - author: (string) the authors username
        - upvote: (int) the number of upvotes
        - downvote: (int) the number of downvotes
- response: 404
    - body: message :id does not exists

``` 
$ curl -X DELETE
       http://localhsot:3000/api/messages/jed5672jd90xg4awo789/
``` 