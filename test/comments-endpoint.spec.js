const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const chai = require('chai')
const chaiHttp = require('chai-http')
require('dotenv').config();


chai.use(chaiHttp)

describe('Comments Endpoints', function () {
  let db

  const {
    testComments,
    testUsers,
  } = helpers.makeCommentsFixtures()

  before('make knex instance', () => {
    console.log(process.env.DB_URL_TEST)
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL_TEST //process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/comments`, () => {
    beforeEach('insert comments', () =>
      db,
      testComments
    )


    it('inserts a new test comment', function (done) {
      chai.request(app)
        .post('/comments')
        .send({ name: 'NameTest', text: 'Testing the user comments api', topic: 'pitch', parent_comment_id: null })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    })
  })
  describe(`GET /api/comments`, () => {
    beforeEach('insert comments', () =>
      db,
      testComments
    )
    it('GETs comments', function (done) {
      chai.request(app)
        .get('/comments')

      .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
      })
    });
  })

  describe(`GET /api/comments`, () => {
    beforeEach('insert comments', () =>
      db,
      testComments
    )
    it('GETs comments by topic', function (done) {
      chai.request(app) //'http://localhost:8000'
        .get('/comments/:topic')

        done();
    });
  })


  describe(`PUT /api/comments/:id`, () => {
    beforeEach('insert comments', () =>
      db,
      testComments
    )
    it('PUTs in comments by id', function (done) {
      chai.request(app)
        .put('/comments/:id')
        .send({ name: 'Jon', comment: 'this is a test comment.' })
        .get('/comments/:id')

        done();
    });
  })



  describe(`DELETE /api/comments/:id`, () => {
    beforeEach('insert comments', () =>
      db,
      testComments
    )
    it('DELETEs comment by id', function (done) {
      chai.request(app) //'http://localhost:8000'
        .delete('/comments/1')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })

    const requiredFields = ['name', 'text']

    requiredFields.forEach(field => {
      const testComment = testComments[0]
      const newComment = {
        name: 'Test Name',
        text: 'test text',
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newComment[field]
      })
    })
  })
})