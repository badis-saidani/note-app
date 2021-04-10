const User = require('../models/user');


//load notebook by uid
async function getNoteBooks(uid, callback){
    let notebooks = await User.getNoteBookByUid(uid);
    callback(notebooks);
}

async function addNoteBook(uid, name, callback){
    let rs = await User.addNewNoteBook(uid, name);
    if (rs){        
        callback(201, {msg: `${name} is created`})
    }
    else {
        callback(403, {msg: `${name} is existed`})
    }    
}

module.exports = { getNoteBooks, addNoteBook }