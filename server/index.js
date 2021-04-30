const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

//Routers
const postRouter = require('./routes/Post.js');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server runnign on port 3001');
    });
})
