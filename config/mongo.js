module.exports = {
  development: {
    database: 'snowbegone',
    host: 'localhost'
  },
  test: {
    database: 'snowbegone',
    host: 'localhost'
  },
  production: {
    use_env_variable: 'MONGODB_URI'
  }
};
