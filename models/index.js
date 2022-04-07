const Sequelize = require('sequelize');

//---------------------------------------
const User = require('./user');
const Study = require('./study');
const Community = require('./community');
//---------------------------------------

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // config.json읽어와서 config에 담음
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = User;
db.Study = Study;
db.Community = Community;

User.init(sequelize);
Study.init(sequelize);
Community.init(sequelize);

User.associate(db);
User.associate1(db);
Study.associate(db);
Community.associate(db);


module.exports = db;
//db 객체 노출


