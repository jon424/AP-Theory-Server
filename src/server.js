require('dotenv').config()
const app = require('./app');
const knex = require('knex')
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server listening at http://localhost:${PORT}`);
});