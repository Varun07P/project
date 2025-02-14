// db.js
const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to MySQL
const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost', // or the host of your database
  dialect: 'mysql',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
