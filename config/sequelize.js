module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'snowbegone',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'snowbegone',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'demo_exploring_sequelize_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
