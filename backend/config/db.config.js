/* Files that specify to Sequelize CLI how to connect to DB */

module.exports = {
  'development': {
    HOST: process.env.DB_HOST_DEV,
    PORT: process.env.DB_PORT_DEV,
    USERNAME: process.env.DB_USERNAME_DEV,
    PASSWORD: process.env.DB_PASSWORD_DEV,
    DB: process.env.DB_NAME_DEV,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  'test': {
    HOST: process.env.DB_HOST_TEST,
    PORT: process.env.DB_PORT_TEST,
    USERNAME: process.env.DB_USERNAME_TEST,
    PASSWORD: process.env.DB_PASSWORD_TEST,
    DB: process.env.DB_NAME_TEST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  },
  'production': {
    HOST: process.env.DB_HOST_PROD,
    PORT: process.env.DB_PORT_PROD,
    USERNAME: process.env.DB_USERNAME_PROD,
    PASSWORD: process.env.DB_PASSWORD_PROD,
    DB: process.env.DB_NAME_PROD,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
};

// module.exports = {
//     HOST: process.env.DB_HOST,
//     PORT: process.env.DB_PORT,
//     USERNAME: process.env.DB_USER,
//     PASSWORD: process.env.DB_PASSWORD,
//     DB: process.env.DB_NAME,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };