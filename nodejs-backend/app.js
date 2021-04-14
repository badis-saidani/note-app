// imports
const express = require('express');
const MongoClient = require("mongodb").MongoClient;
// you can use here config.DB_CONNECTION to connect to DB in the cloud atlas instead of local DB
// after we finish the project will hide the config file in .gitignore
//mongodb://localhost:27017
const cors = require('cors');
require('dotenv/config');
const client = new MongoClient(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const reminderRouter = require('./routes/reminder');
const notebookRouter = require('./routes/notebook');
const authRouter = require('./routes/auth');

const authRepository = require('./repository/authRepository')

// init
let db;
const port = 3000;
const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send({ error: err });
}

// routers
app.use("/api/reminders", authRepository.autheticateByJWT, reminderRouter);
app.use("/api/notebooks", authRepository.autheticateByJWT, notebookRouter.router);
app.use("/api/auth", authRouter);

app.use(errorHandler);

//DB connection
client.connect(() => {
   console.log('connected to db!');
 });

// boot up
app.listen(port, () => console.log("Listening in port " + port));

