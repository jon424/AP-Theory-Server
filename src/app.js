/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { NODE_ENV } = require('./config');
const winston = require('winston');
const { pool } = require('./config');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

// const knex = require('knex');
// const knexInstance = knex({
//   client: 'pg',
//   connection: process.env.DB_URL
// });

// const q1 = knexInstance('user_comments').select('*').toQuery()


// knexInstance.from('user_comments').select('*').then(result => {

// });


//setting up winston...
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
//...end of winston setup

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(express.json());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

//Authorization Middleware
// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN
//   const authToken = req.get('Authorization')

//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     logger.error(`Unauthorized request to path: ${req.path}`);
//     return res.status(401).json({ error: 'Unauthorized request' })
//   }
//   // move to the next middleware
//   next()
// })


//*****API Requests For Comments Section*****/
const getComments = (request, response) => {
 
  pool.query('SELECT * FROM user_comments ORDER BY date DESC', (error, results) => {
    
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
   
  })
}

const getCommentsByTopic = (request, response) => {
  const topic = request.params.topic

  pool.query(
    'SELECT * FROM user_comments WHERE topic = $1 ORDER BY date DESC',
    [topic],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

const createComment = (request, response) => {
  const { name, topic, text } = request.body
  if(typeof(request.body.parentCommentId) != "undefined") request.body.parent_comment_id=request.body.parentCommentId;
  const parentCommentId = request.body.parent_comment_id !== null ? parseInt(request.body.parent_comment_id) : null;

  pool.query(
    'INSERT INTO user_comments (name, topic, text, parent_comment_id) VALUES ($1, $2, $3, $4)',
    [name, topic, text, parentCommentId],
    error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'New comment added.' })
    }
  )
}

const updateComment = (request, response) => {
  const { name, topic, text } = request.body
  const id = parseInt(request.params.id)
  const parentCommentId = parseInt(request.body.parentCommentId)

  pool.query(
    'UPDATE user_comments SET name = $1, topic = $2, text = $3, parent_comment_id = $4 WHERE id = $5',
    [name, topic, text, parentCommentId, id],
    error => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: `Comment modified with ID: ${id}` })
    }
  )
}

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM user_comments WHERE id = $1', [id], error => {
    if (error) {
      throw error
    }
    response.status(200).json({ status: 'success', message: `Comment deleted with ID: ${id}` })
  })
}

app.get('/comments', getComments)
app.get('/comments/:topic', getCommentsByTopic)
app.post('/comments', createComment)
app.put('/comments/:id', updateComment)
app.delete('/comments/:id', deleteComment)

//*****END OF API Requests*****/


app.use(function errorHandler(error, req, res, next) {
  let response;
  console.error(error);
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;