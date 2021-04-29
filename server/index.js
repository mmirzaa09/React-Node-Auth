const expree = require('express');
const app = expree();

const db = require('./models');

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server runnign on port 3001');
    });
})
