const User = require('../models/user');

async function getNoteContent(uid, notebookName, noteTitle, callback){
    let content = await User.getNoteContent(uid, notebookName, noteTitle);
    callback(content);
}

async function addANote(uid, notebookName, newNote, callback){
    let result = await User.addANote(uid, notebookName, newNote);
    if (result){
        callback(200, {success: true, message: `${newNote.title} is created`});
    }
    else {
        callback(403, {success: false, message: `${newNote.title} is existed`});
    }
}

async function updateANote(uid, notebookName, noteTitle, newNote, callback){
    let count = await User.updateNote(uid, notebookName, noteTitle, newNote);
    if (count == 0){
        callback(403, {success: false, message: `Can not update ${noteTitle} to ${newNote}`});
    }
    else {
        callback(200, {success: true, message: `${noteTitle} is updated to ${newNote}`});
    }
}

async function deleteANote(uid, notebookName, noteTitle, callback){
    let count = await User.deleteNote(uid, notebookName, noteTitle);
    if (count == 0){
        callback(403, {success: false, message: `Can not delete ${noteTitle}`});
    }
    else {
        callback(200, {success: true, message: `${noteTitle} is deteled`});
    }
}


module.exports = {getNoteContent, addANote, updateANote, deleteANote}