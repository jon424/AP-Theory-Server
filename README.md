## AP Theory

A guide for Advanced Placement Music Theory class! Contains Topic Overviews and graded practice Quizzes to help you succeed on the AP Music Theory Exam. Utilizes React, Express, and PostgreSQL.

### A live link of the project is available here: (https://new-ap-theory-client.now.sh)

### Screenshot
![alt text](https://github.com/jon424/new-AP-Theory-Client/blob/5d175110016a56e234ac852d4cf69d35cf076748/src/Topic/TopicAttachments/ap-theory-screenshot.png "AP Theory Homepage")


## Comments endpoint

Users may enter comments on the various Topics pages. Only Admin may update/delete comments from database. 

POST /api/comments will yield:

[
{
"id": 25,
"name": "Joe",
"date": "2020-01-10T20:07:41.969Z",
"topic": "pitch",
"parent_comment_id": null,
"text": "New comment."
},

{
"id": 24,
"name": "Samantha",
"date": "2020-01-10T20:07:32.524Z",
"topic": "pitch",
"parent_comment_id": null,
"text": "Nice content! :-)"
}
]


## Scripts

Start ap-theory server using `npm run dev`

Run the tests `npm test`


## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.# AP-Theory-Server
