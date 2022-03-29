import fn from 'knex';

const knex = fn({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'ecdb'
  },
  pool: { min: 0, max: 10 }
});

export default knex;