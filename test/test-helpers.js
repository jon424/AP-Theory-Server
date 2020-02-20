function makeUsersArray() {
  return [
    {
      id: 1,
      name: 'test-user-1',
    }
  ]
}

function makeCommentsArray(users) {
  return [
    {
      id: 1,
      name: users[0].name,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    }
  ]
}

function makeCommentsFixtures() {
  const testUsers = makeUsersArray()

  const testComments = makeCommentsArray(testUsers)
  return { testUsers, testComments }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE user_comments`
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE user_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('user_comments_id_seq', 0)`),
      ])
    )
  )
}

module.exports = {
  makeUsersArray,
  makeCommentsArray,
   makeCommentsFixtures,
   cleanTables
}
