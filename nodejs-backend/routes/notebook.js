const router = require('express').Router();

const notebookRepo = require('../repository/notebookRepository');


router.get("/notebooks", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        notebookRepo.getNoteBooks(uid, (result) => {
            res.json(result);
        });
        
    });
});

router.post("/notebooks", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.addNoteBook(uid, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});

function autheticateByJWT(req, res, next){
    req.jwt = {uid: "andy"};
    return next();
}

module.exports = { router };