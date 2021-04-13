// imports
const express = require('express');
//const config = require('./config/config');
const MongoClient = require("mongodb").MongoClient;
// you can use here config.DB_CONNECTION to connect to DB in the cloud atlas instead of local DB
// after we finish the project will hide the config file in .gitignore
//mongodb://localhost:27017
const cors = require('cors');
const {db_connection} = require('./config/config');
const client = new MongoClient(db_connection, { useNewUrlParser: true, useUnifiedTopology: true });
const { verifyJWT } = require('./middlewares/jwtVerifier')
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
// app.use((req, res, next) => {
//     if (!db) {
//         client.connect((err) => {
//             db = client.db('note-app');
//             req.db = db.collection('users');
//             db = req.db;
//             next();
//         })
//     }
//     else {
//         req.db = db;
//         next();
//     }
// });

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send({ error: err });
}

//app.use("/api", authRepository.autheticateByJWT);

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

