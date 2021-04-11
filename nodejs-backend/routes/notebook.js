const router = require('express').Router();

const notebookRepo = require('../repository/notebookRepository');
const nodeRepository = require('../repository/noteRepository');

router.get("/", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        notebookRepo.getNoteBooks(uid, (result) => {
            res.json(result);
        });
        
    });
});

router.post("/", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.addNoteBook(uid, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});


router.delete("/:name", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.deleteNoteBook(uid, req.params.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});

router.patch("/:name", autheticateByJWT, async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.updateNoteBook(uid, req.params.name, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});


//notes in side a notebook
// api/notebooks/:notebookName/notes/:title
router.get('/:notebookName/notes/:title', autheticateByJWT, async (req, res)  => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        nodeRepository.getNoteContent(uid, req.params.notebookName, req.params.title, (content) => {
            res.json(content);
        });
    });
});

router.post('/:notebookName/notes', autheticateByJWT, async (req, res)  => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        nodeRepository.addANote(uid, req.params.notebookName, req.body, (status, content) => {
            res.status(status).json(content);
        });
    });
});


router.patch('/:notebookName/notes/:title', autheticateByJWT, async (req, res)  => {
    let uid = req.jwt.uid;    

    setImmediate(() => {
        nodeRepository.updateANote(uid, req.params.notebookName, req.params.title, req.body, (status, msg) => {
            res.status(status).json(msg);
        });
    });
});

router.delete('/:notebookName/notes/:title', autheticateByJWT, async (req, res)  => {
    let uid = req.jwt.uid;
    
    setImmediate(() => {
        nodeRepository.deleteANote(uid, req.params.notebookName, req.params.title, (status, msg) => {
            res.status(status).json(msg);
        });
    });
});
//notes



function autheticateByJWT(req, res, next){
    req.jwt = {uid: "andy"};
    return next();
}

module.exports = { router };