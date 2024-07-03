const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  dialect: config[env].dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes)
db.Sessions = require('./session')(sequelize, DataTypes)

module.exports = db;
