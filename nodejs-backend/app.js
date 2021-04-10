const express = require('express');
const config = require('./config/config');

const MongoClient = require("mongodb").MongoClient;
// you can use here config.DB_CONNECTION to connect to DB in the cloud atlas instead of local DB
// after we finish the project will hide the config file in .gitignore
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const notebook = require('./routes/notebook');

let db;
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (!db){
        client.connect((err) => {
            db = client.db('note-app');
            req.db = db.collection('users');
            db = req.db;
            next();
        })
    }
    else {
        req.db = db;
        next();
    }
});


app.use("/api", notebook.router);

app.listen(port, () => console.log("Listening in port " + port));
