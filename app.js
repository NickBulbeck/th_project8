console.log("Hello, wurrld!");
const sequelize = require('./models/index.js').sequelize;
console.log(sequelize.options.storage);
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected successfully: ", sequelize.config);
    } catch(error) {
        console.log("Bah: ", error.message);
    }
})();