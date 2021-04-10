const router = require('express').Router();

const notebookRepo = require('../repository/notebookRepository');


router.get("/notebooks", async (req, res) => {
    //let uid = req.jwt.uid;
    let uid = "andy";

    setImmediate(() => {
        notebookRepo.getNoteBooks(req.db, uid, (err, result) => {
            res.json({});
        });
        
    });
});

module.exports = { router };