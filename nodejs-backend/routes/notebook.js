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


router.delete("/notebooks/:name", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.deleteNoteBook(uid, req.params.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});

router.patch("/notebooks/:name", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.updateNoteBook(uid, req.params.name, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});

function autheticateByJWT(req, res, next){
    req.jwt = {uid: "andy"};
    return next();
}

module.exports = { router };