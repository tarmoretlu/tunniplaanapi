const config = {
  port: 3000,
  saltRounds: 10,
  jwtSecret: 'secret',
  db: {
    host: 'localhost',
    user: 'root',
    password: 'parool',
    database: 'timetablesapi',
  },
};

module.exports = config;
