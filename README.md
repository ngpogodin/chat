# chat

Pet-project.Simple chat server. REST API(node.js/express,mongoDB/mongoose) with upgrade to websocket,when enter the chat room.

## Key Concept and Endpoints description

 ### ```POST /login```

Requires no auth,sings in existent user and generate JWT tokens

Example request body: 

```
{
	"username": "conorMcGregor",
	"password": "illbeatyoass"
} 
```

Example response: 
```
{
    "userData": {
        "user": {
            "username": "someName",
            "id": "61ed25ab903420dbaf8a45b2",
            "roomsList": []
        },
        "refreshToken": "refreshToken here",
        "accessToken": "accessToken here"
    }
}
```

### ```/registation```

Requires no auth, create new user and generate JWT tokens

Example request body: 
```
{
    "username" : "1sdasdssdda2",
    "password" : "1sdAsda23"
}
```
There are validator for request body.

A response is the same as sing in response.

### ```GET /refresh```

Requires no auth.Generate a new accessToken, if a refreshToken in coockies is valid.

A response is the same as sing in response.

### ```POST /room ```

Requires auth.Create a new room.

Example request body: 
```
{
    "name" : "VipRoom",
    "members" : ["MAx228","conorMcGregor","Macron"],
    "admins" : ["Macron"],
    "isClose": "true"
}
```

Response: 
```
{
    "name": "VipRoom",
    "users": [
        "61decbb2b92c041557126abd",
        "61d8a93b3e589419188a9256",
        "61d8ad434dd6b947ce60bd35",
    ],
    "admins": [
        "61decbb2b92c041557126abd"
    ],
    "messages": [],
    "isClose": true,
    "id": "61f2e12c6bb2d9b3bd487d76",
}
```

### ```GET /room```

Requires auth.There are query params - offset,limit(pagination)

Return list of rooms. 

If the room is private(isClose field) and user is not a member of the room , return response without messages and users fields.
```
{
    "name": "VipRoom",
    "admins": [
        {
            "_id": "61decbb2b92c041557126abd",
            "username": "Andre"
        }
    ],
    "id": "61f2e12c6bb2d9b3bd487d76",
    "isClose": true
}
```

### ```GET /room/:id```

Requires auth.Get user by id or room`s name.

Response is the same as above.

### ```POST /room/invite``` 

Requires auth.Invite new members in room. Only admin has permission to invite.

Return Room.

Example input:
```
{
    "members" : ["Zelensky", "Macron"],
    "roomId" : "61ed1c1f527a72913f70b290"
}
```

### ```POST /room/remove```

Condition,input and output are the same as above in ### ```POST /room/invite``` 

### ```DELETE /room/:id```

Delete room.Admins have a permission.

### ```GET /user/:username```

Requires auth, return User: 
```
{
    "username": "Andrey",
    "id": "61ed25a5903420dbaf8a45a6"
}
```

### ```GET /user/```

Requires auth, return users list.

## WebSocket

Access token and room id are transmitted with a handshake via query params.

Only members invited by the admin have access to private rooms.

### Answer to method "enter" from client:

#### Example broadcast(in room) output: 
```
{
  "method":"enter",
  "username":"Arnold"
}
```
#### Also clients receive message with method "online" after whoever connected to the room, which represends members in room:
```
{
    "method": "online",
    "online": [
        "Arnold",
        "anonymous"
    ]
}
```

### Method "msg" 

#### Client`s example: 
```
{
    "method": "msg",
    "messageObj": {
        "message": "something special",
        "username": "Me"
    }
}
```
#### Broadcast(in room) response: 
```
{
    "method": "msg",
    "data": {
        "message": "something special",
        "username": "Me",
        "date": 1643319074806
    }
}
```

### Everyone(in room) gets a message with method "online" if someone drops the connection.

