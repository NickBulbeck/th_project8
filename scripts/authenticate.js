

const sequelize = require('../models/index.js').sequelize;
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successfully authenticated ${sequelize.options.storage}`);
  } catch (error) {
    console.log(`Failed to authenticate: ${error.status}, ${error.message}`);
  }
  try {
    await sequelize.sync({force:false});
    console.log(`sync() performed`);
  } catch (error) {
    console.log(`Failed to sync: ${error.status}, ${error.message}`);
  }
}
module.exports.testConnection = testConnection;