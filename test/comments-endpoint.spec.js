const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Comments Endpoints', function () {
  let db

  const {
    testComments,
    testUsers,
  } = helpers.makeCommentsFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL_TEST, //process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/comments`, () => {
    beforeEach('insert comments', () =>
     // helpers.seedCommentsTables(
        db,
      // testUsers,
        testComments
      )
    

    // it(`responds 401 'Unauthorized request' when invalid password`, () => {
    //   const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
    //   return supertest(app)
    //     .post('/api/comments')
    //     .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
    //     .expect(401, { error: `Unauthorized request` })
    // })


    it('inserts a new test comment', function(done) {
      chai.request('http://localhost:8000')
      .post('/comments')
      .send({name: 'Jon', comment: 'this is a test comment.'})
      .end(function (err, res) {
        //expect(err).to.be.null;
       // expect(res).to.have.status(200);
        done();
     });
    })


    // it(`creates a comment, responding with 201 and the new comment`, function () {
    //   this.retries(3)
    //   //const testArticle = testComments[0]
    //   //const testUser = testUsers[0]
    //   const newComment = {
    //     name: 'test name',
    //     text: 'this is a test text for comments section',
    //     topic: 'new topic'
    //   }
    //   return supertest(app)
    //     .post('/api/comments')
    //    // .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
    //     .send(newComment)
    //     .expect(201)
    //     .expect(res => {
    //      // expect(res.body).to.have.property('id')
    //       expect(res.body.name).to.eql(newComment.name)
    //       expect(res.body.text).to.eql(newComment.text)
    //      // expect(res.body.text).to.eql(newComment.topic)
    //      // expect(res.body.article_id).to.eql(newComment.article_id)
    //       //expect(res.body.user.id).to.eql(testUser.id)
    //      // expect(res.headers.location).to.eql(`/api/comments/${res.body.id}`)
    //     //  const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
    //    //   const actualDate = new Date(res.body.date_created).toLocaleString()
    //    //   expect(actualDate).to.eql(expectedDate)
    //     })
    //     .expect(res =>
    //       db
    //         .from('user_comments')
    //         .select('*')
    //        // .where({ id: res.body.id })
    //         .first()
    //         .then(row => {
    //           expect(row.text).to.eql(newComment.text)
    //           expect(row.name).to.eql(newComment.name)
    //           should.not.exist(topic);
    //          // expect(row.name).to.eql(newComment.topic)
    //         //  expect(row.user_id).to.eql(testUser.id)
    //         //  const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
    //         //  const actualDate = new Date(row.date_created).toLocaleString()
    //        //   expect(actualDate).to.eql(expectedDate)
    //         })
    //     )
    // })

    const requiredFields = ['name', 'text']

    requiredFields.forEach(field => {
      const testComment = testComments[0]
     // const testUser = testUsers[0]
      const newComment = {
        name: 'Test Name',
        text: 'test text',
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newComment[field]

        // return supertest(app)
        //   .post('/api/comments')
        //  // .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        //   .send(newComment)
        //   .expect(400, {
        //     error: `Missing '${field}' in request body`,
        //   })
      })
    })
  })
})
