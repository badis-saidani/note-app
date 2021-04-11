const User = require('../models/user');


//load notebook by uid
async function getNoteBooks(uid, callback){
    let notebooks = await User.getNoteBookByUid(uid);
    callback(notebooks);
}

async function addNoteBook(uid, name, callback){
    let rs = await User.addNewNoteBook(uid, name);
    if (rs){                
        callback(201, {success: true, message: `${name} is created`})
    }
    else {
        callback(403, {success: false, message: `${name} is existed`})
    }    
}

async function deleteNoteBook(uid, name, callback){
    let count = await User.deleteNoteBook(uid, name);
    if (count == 0){
        callback(403, {success: false, message: `Can NOT delete ${name}`});
    }
    else {
        callback(200, {success: true, message: `${name} is deleted`});
    }
}

async function updateNoteBook(uid, oldName, newName, callback){
    let count = await User.updateNoteBook(uid, oldName, newName);
    if (count == 0){
        callback(403, {success: false, message: `Can NOT update ${oldName} to ${newName}`});
    }
    else {
        callback(202, {success: true, message: `${oldName} notebook is changed to ${newName}`});
    }
}

module.exports = { getNoteBooks, addNoteBook, deleteNoteBook, updateNoteBook }