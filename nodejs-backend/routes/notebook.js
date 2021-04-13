const router = require('express').Router();

const notebookRepo = require('../repository/notebookRepository');
const nodeRepository = require('../repository/noteRepository');

router.get("/", async (req, res) => {
    let uid = req.jwt.uid;
    console.log(uid);
    setImmediate(() => {
        notebookRepo.getNoteBooks(uid, (result) => {
            res.json(result);
        });
        
    });
});

router.post("/", async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.addNoteBook(uid, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});


router.delete("/:name", async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.deleteNoteBook(uid, req.params.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});

router.patch("/:name", async (req, res) => {
    let uid = req.jwt.uid;
    setImmediate(() => {
        notebookRepo.updateNoteBook(uid, req.params.name, req.body.name, (status, msg) => {
            res.status(status).json(msg);
        });
    });    
});


//notes in side a notebook
// api/notebooks/:notebookName/notes/:title
router.get('/:notebookName/notes/:title', async (req, res)  => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        nodeRepository.getNoteContent(uid, req.params.notebookName, req.params.title, (content) => {
            res.json(content);
        });
    });
});

router.post('/:notebookName/notes', async (req, res)  => {
    let uid = req.jwt.uid;

    setImmediate(() => {
        nodeRepository.addANote(uid, req.params.notebookName, req.body, (status, content) => {
            res.status(status).json(content);
        });
    });
});


router.patch('/:notebookName/notes/:title', async (req, res)  => {
    let uid = req.jwt.uid;    

    setImmediate(() => {
        nodeRepository.updateANote(uid, req.params.notebookName, req.params.title, req.body, (status, msg) => {
            res.status(status).json(msg);
        });
    });
});

router.delete('/:notebookName/notes/:title', async (req, res)  => {
    let uid = req.jwt.uid;
    
    setImmediate(() => {
        nodeRepository.deleteANote(uid, req.params.notebookName, req.params.title, (status, msg) => {
            res.status(status).json(msg);
        });
    });
});
//notes



// function autheticateByJWT(req, res, next){
//     req.jwt = {uid: "andy"};
//     return next();
// }

module.exports = { router };