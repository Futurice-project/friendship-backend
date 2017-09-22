# Routes

### Personality

*GET /personalities*

*GET /personalities/{personalityId}*

*POST /personalities*
Require scope: admin

Example payload: 
```
{
	"name": "funny"
}
```
*PATCH /personalities/{personalityId}*
Require scope: admin

Example payload: 
```
{
	"name": "funny"
}
```

*GET /user_personality/{userId}*


*POST /user_personality*
Require scope: signed-in user
Level: 1-5

Example payload:
```
{
	"userId": 1,
	"personalityId": 5,
	"level": 5
}
```

*PATCH /user_personality*
Require scope: signed-in user
Level: 1-5

Example payload:
```
{
	"userId": 1,
	"personalityId": 5,
	"level": 5
}
```

*DELETE /personalities/{personalityId}*
Not working at the moment due to FK constraint


### Topics

*GET /topics*

*GET /topics/{topicId}*

*POST /topics*
Require scope: admin

Example payload: 
```
{
	"name": "football"
}
```

*PATCH /topics/{topicId}*
Require scope: admin

Example payload: 
```
{
	"name": "football"
}
```

*GET /user_topic/{userId}*


*POST /user_topic*
Require scope: signed-in user
Level: 1-5

Example payload:
{
	"userId": "1",
	"topicId": "11",
	"love": true
}

*DELETE /user_topic*
Require scope: signed-in user
Level: 1-5

Example payload:
{
	"userId": "1",
	"topicId": "11"
}