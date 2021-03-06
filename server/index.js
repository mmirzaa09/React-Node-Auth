const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const postRouter = require('./routes/Post');
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/like", likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server runnign on port 3001');
    });
})
